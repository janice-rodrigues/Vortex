#!/usr/bin/env python3
"""
Contentstack docs audit runner (inventory -> metrics CSV).

Goal: run lightweight checks across the full docs corpus to identify
systemic documentation issues and prioritize pages for deeper review.
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


INVENTORY_CSV = "CS Gaps/audit/contentstack_docs_inventory.csv"
OUT_METRICS_CSV = "CS Gaps/audit/contentstack_docs_metrics.csv"

# Keep the fetch light. We only need enough HTML for headings/metadata.
MAX_BYTES = 120_000
TIMEOUT_SECS = 25

# Politeness knob: applied while QUEUING work (not per-response).
# With concurrency enabled, this keeps request bursts under control.
SUBMIT_DELAY_SECS = 0.03

UA = "Mozilla/5.0 (compatible; VortexDocsAudit/1.0)"


@dataclass
class FetchResult:
    url: str
    final_url: str
    status: int
    content_type: str
    content_length: int
    html_snippet: str


def read_inventory_urls(path: str) -> list[str]:
    urls: list[str] = []
    with open(path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        if "url" not in (r.fieldnames or []):
            raise ValueError(f"Inventory CSV missing 'url' column: {path}")
        for row in r:
            u = (row.get("url") or "").strip()
            if u:
                urls.append(u)
    return urls


def fetch_html(url: str) -> FetchResult:
    req = Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Range": f"bytes=0-{MAX_BYTES - 1}",
        },
        method="GET",
    )
    with urlopen(req, timeout=TIMEOUT_SECS) as resp:
        final_url = resp.geturl()
        status = getattr(resp, "status", 200)
        ct = resp.headers.get("Content-Type", "") or ""
        cl = int(resp.headers.get("Content-Length", "0") or "0")
        raw = resp.read(MAX_BYTES)

    # Best-effort decode. We only need approximate text for regex checks.
    html = raw.decode("utf-8", errors="replace")
    return FetchResult(
        url=url,
        final_url=final_url,
        status=int(status),
        content_type=ct,
        content_length=cl,
        html_snippet=html,
    )


def safe_fetch(url: str) -> FetchResult:
    try:
        return fetch_html(url)
    except HTTPError as e:
        body = ""
        try:
            body = (e.read(MAX_BYTES) or b"").decode("utf-8", errors="replace")
        except Exception:
            body = ""
        return FetchResult(
            url=url,
            final_url=url,
            status=int(getattr(e, "code", 0) or 0),
            content_type=str(getattr(e, "headers", {}).get("Content-Type", "") or ""),
            content_length=0,
            html_snippet=body,
        )
    except (URLError, TimeoutError) as e:
        return FetchResult(
            url=url,
            final_url=url,
            status=0,
            content_type="",
            content_length=0,
            html_snippet=str(e),
        )


def count_regex(pat: str, s: str, flags: int = re.I) -> int:
    return len(re.findall(pat, s, flags))


def has_regex(pat: str, s: str, flags: int = re.I) -> bool:
    return re.search(pat, s, flags) is not None


def extract_title(html: str) -> str:
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    if not m:
        return ""
    t = re.sub(r"\s+", " ", m.group(1)).strip()
    return t[:240]


def extract_canonical(html: str) -> str:
    m = re.search(
        r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']',
        html,
        re.I,
    )
    return (m.group(1).strip() if m else "")[:500]


def approx_main_text_len(html: str) -> int:
    """
    Crude: if <main> exists, measure its inner text length after stripping tags.
    This helps approximate how much "actual content" is present versus nav.
    """
    m = re.search(r"<main[^>]*>(.*)</main>", html, re.I | re.S)
    if not m:
        return 0
    inner = m.group(1)
    inner = re.sub(r"<script[^>]*>.*?</script>", " ", inner, flags=re.I | re.S)
    inner = re.sub(r"<style[^>]*>.*?</style>", " ", inner, flags=re.I | re.S)
    inner = re.sub(r"<[^>]+>", " ", inner)
    inner = re.sub(r"\s+", " ", inner).strip()
    return len(inner)


def section_from_url(url: str) -> str:
    try:
        path = urlparse(url).path
    except Exception:
        return ""
    parts = [p for p in path.split("/") if p]
    if not parts or parts[0] != "docs":
        return "non-docs"
    if len(parts) == 1:
        return "docs-root"
    return parts[1]


def depth_from_url(url: str) -> int:
    try:
        return urlparse(url).path.count("/")
    except Exception:
        return 0


def compute_metrics(fr: FetchResult) -> dict[str, object]:
    html = fr.html_snippet or ""

    title = extract_title(html)
    canonical = extract_canonical(html)
    h1_count = count_regex(r"<h1\b", html)
    has_meta_desc = has_regex(r'<meta[^>]+name=["\']description["\']', html)
    # Contentstack docs often render code blocks as <pre> with highlighted spans (no <code> tag).
    has_code_block = has_regex(r"<pre\b", html)

    # Task-first headings (very rough).
    has_prereq = has_regex(r">\s*Prerequisites\s*<", html)
    has_troubleshooting = has_regex(r">\s*Troubleshooting\s*<", html)
    has_expected = has_regex(r">\s*Expected(\s+output)?\s*<", html)
    has_steps = has_regex(r">\s*(Steps|Step\s+\d+)\s*<", html)

    # Noise strings that commonly appear in header/menu for these pages.
    nav_noise_hits = 0
    for needle in [
        "Winning AI search",
        "Talk to Us",
        "Start Free",
        "Quick Links",
        "menu",
        "Academy",
        "Changelog",
    ]:
        if needle.lower() in html.lower():
            nav_noise_hits += 1

    main_text_len = approx_main_text_len(html)

    return {
        "url": fr.url,
        "final_url": fr.final_url,
        "status": fr.status,
        "section": section_from_url(fr.url),
        "depth": depth_from_url(fr.url),
        "content_type": fr.content_type,
        "content_length_header": fr.content_length,
        "title": title,
        "canonical": canonical,
        "has_canonical": bool(canonical),
        "has_meta_description": has_meta_desc,
        "h1_count": h1_count,
        "has_code_block": has_code_block,
        "has_prerequisites_heading": has_prereq,
        "has_steps_heading": has_steps,
        "has_expected_heading": has_expected,
        "has_troubleshooting_heading": has_troubleshooting,
        "nav_noise_hits": nav_noise_hits,
        "main_text_len_approx": main_text_len,
    }


def write_metrics(rows: Iterable[dict[str, object]], out_path: str) -> None:
    rows = list(rows)
    if not rows:
        raise ValueError("No metric rows to write")
    fieldnames = list(rows[0].keys())
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)


def parse_args(argv: list[str]) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Run automated audit over Contentstack docs URLs.")
    p.add_argument("--inventory", default=INVENTORY_CSV, help="Path to inventory CSV.")
    p.add_argument("--out", default=OUT_METRICS_CSV, help="Path to output metrics CSV.")
    p.add_argument(
        "--max-pages",
        type=int,
        default=0,
        help="If > 0, limit to first N URLs (for quick testing).",
    )
    p.add_argument(
        "--workers",
        type=int,
        default=10,
        help="Concurrent workers for fetching pages.",
    )
    return p.parse_args(argv)


def main() -> int:
    args = parse_args(sys.argv[1:])
    urls = read_inventory_urls(args.inventory)
    if args.max_pages and args.max_pages > 0:
        urls = urls[: args.max_pages]

    print(f"Inventory URLs: {len(urls)}", flush=True)

    rows: list[dict[str, object]] = []
    ok = 0
    bad = 0

    total = len(urls)
    started = time.time()

    with ThreadPoolExecutor(max_workers=max(1, int(args.workers))) as ex:
        futures = []
        for url in urls:
            futures.append(ex.submit(safe_fetch, url))
            time.sleep(SUBMIT_DELAY_SECS)

        done = 0
        for fut in as_completed(futures):
            fr = fut.result()
            row = compute_metrics(fr)
            rows.append(row)
            done += 1

            if row["status"] and int(row["status"]) < 400:
                ok += 1
            else:
                bad += 1

            if done % 50 == 0 or done == total:
                elapsed = max(0.1, time.time() - started)
                rate = done / elapsed
                print(
                    f"Done {done}/{total} (ok={ok}, bad={bad}) rate={rate:.1f}/s",
                    flush=True,
                )

    # Stable output order for diffing across runs.
    rows.sort(key=lambda r: str(r.get("url", "")))

    write_metrics(rows, args.out)
    print(f"Wrote metrics: {args.out}", flush=True)
    print(f"ok={ok} bad={bad}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

