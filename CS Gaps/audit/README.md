## Contentstack Docs Site Audit (Vortex)

This folder contains a **repeatable audit** of the public Contentstack documentation site (inventory + automated checks + findings).

### Related: Academy gap analysis

- `contentstack_academy_gap_analysis.md`
  - Qualitative gaps review of **Contentstack Academy** information architecture + curriculum coverage.
  - Focus: discoverability, onboarding friction, hands-on lab quality, and “ship-it” enablement for developers/content managers.

### What’s in here

- `contentstack_docs_inventory.csv`
  - **Source of truth list** of docs URLs, generated from the public sitemap.
  - Columns: `url`, `lastmod`, `section`, `depth`

- `run_contentstack_docs_audit.py`
  - Fetches each URL from the inventory and computes lightweight, AI-friendly diagnostics.
  - Writes: `contentstack_docs_metrics.csv`

### Metrics collected (high level)

For each page we capture:

- HTTP status + final URL (redirects)
- Basic SEO/structure signals:
  - canonical link presence
  - meta description presence
  - `<h1>` count (0/1/multiple)
- Developer affordances:
  - presence of code blocks (`<pre><code>`)
  - headings that indicate task-first docs: “Prerequisites”, “Steps”, “Expected”, “Troubleshooting”
- “AI readability” heuristics:
  - crude nav/boilerplate noise marker (strings that frequently appear in headers/menus)
  - approximate “main content” extraction if a `<main>` element exists

### How to run

From repo root:

```bash
python3 "CS Gaps/audit/run_contentstack_docs_audit.py"
```

This script requires network access.

