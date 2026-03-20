# Contentstack Docs Audit — Automated Pass Summary

- Inventory size: **1023** URLs (from public sitemap)
- Fetch success: **1023** ok (2xx/3xx), **0** non-ok

## Sitewide structure signals (ok pages only)

- Missing canonical: **2 / 1023**
- Missing meta description: **2 / 1023**
- H1 missing (0): **15 / 1023**
- H1 multiple (>1): **2 / 1023**
- Has no code blocks (`<pre>`): **770 / 1023**
- Has no Troubleshooting heading: **1013 / 1023**

## Main content length heuristic

This is a rough proxy: if the page includes a `<main>` element, we strip tags and measure text length.
- Pages where `<main>` was detected: **976 / 1023**
- `<main>` text length (chars): median **3922**, p10 **1963**, p90 **9945**

## Per-section rollup (ok pages)

| section | pages | missing canonical | missing meta desc | h1=0 | h1>1 | has code | has troubleshooting | main detected |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| developers | 721 | 1 | 1 | 14 | 2 | 229 | 9 | 677 |
| content-managers | 187 | 0 | 0 | 0 | 0 | 5 | 0 | 187 |
| personalize | 51 | 0 | 0 | 0 | 0 | 7 | 1 | 50 |
| studio | 28 | 0 | 0 | 0 | 0 | 10 | 0 | 28 |
| data-and-insights | 12 | 0 | 0 | 0 | 0 | 2 | 0 | 12 |
| analytics | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 8 |
| get-started | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 5 |
| overview | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 3 |
| changelog | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| contentstack-accessibility-statement | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| data-and-insights-lytics | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| docs-root | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| faqs | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| manage-notifications | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| navigating-contentstack | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| search | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |

## Output files

- `contentstack_docs_inventory.csv`: sitemap-derived URL inventory
- `contentstack_docs_metrics.csv`: per-URL metrics from automated checks
- `contentstack_docs_audit_top_issues.csv`: top 200 URLs by heuristic “fix-first” score
