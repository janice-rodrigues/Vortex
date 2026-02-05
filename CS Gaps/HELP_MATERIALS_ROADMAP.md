# Help Materials Roadmap (Docs + In‑Product) — Contentstack × Vortex

This is a practical list of **help materials** we can create/improve so users can successfully connect Contentstack entries to this website **without relying on AI assistance**.

---

## Docs to create / improve

### 1) “Start here” integration guide (golden path)
- **Goal**: get content rendering end-to-end in < 15 minutes.
- **Include**:
  - A clear **decision**: Runtime (fast) vs Build‑time/Server (secure) vs Proxy (secure + runtime)
  - “What you need before you begin” checklist
  - Step-by-step setup with **expected outputs** after each step
  - A “known good” example using the **homepage entry**

### 2) Content model & field UID primer (must-have)
- **UID vs label**: explain with screenshots + examples
- How to find:
  - Content Type UID
  - Field UIDs
  - Entry UID
- A mini glossary: Stack API key, Delivery token, Environment, Locale, Publish details

### 3) Reference content models (copy/paste)
Provide ready-to-use blueprints that match common rendering strategies:
- **Modular sections** model (like `sections[]` with `hero_section`, `feature_grid`, etc.)
- **Flat fields** model (simple pages)
- **Blog post** model (slug, title, excerpt, category, body, published_at, SEO)
For each model:
- Required fields
- Optional fields
- Example Delivery API response snippets

### 4) Region/host cheat sheet (CDN vs management)
- A table: **NA/EU/Azure** → correct Delivery API host
- Warning callout: “Don’t use `api.contentstack.io` for Delivery API”

### 5) Publishing & environment behavior guide
- “Saved vs Published” explanation (draft/published/scheduled)
- How to publish to **a specific environment**
- How to verify publication and troubleshoot “empty API response”

### 6) Troubleshooting guide (error → cause → fix)
Create a searchable page with:
- **401/403**: token issues, wrong host, permissions, environment mismatch
- **404**: wrong UIDs (content type/entry), wrong path, region
- **Empty / missing fields**: field UID mismatch, locale mismatch, unpublished entry
- “How to validate with curl/Postman” section

### 7) “Validate your setup” tools in docs
- **curl snippets** for:
  - get entry by UID
  - query by UID
  - query by slug
  - include references / include content type schema (if needed)
- A downloadable **Postman collection** for Delivery API calls

### 8) Local development & preview docs
- Known-good commands:
  - Python static server
  - Node static server (fallback)
  - Next.js dev server (if applicable)
- Port fallback list + how to confirm server is running
- Common Mac permission/port conflicts and fixes

### 9) Security docs (very explicit)
- Which tokens are safe to expose (Delivery tokens are **public** if used client-side)
- How to keep tokens private (Next.js server fetch, build-time generation, serverless proxy)
- “Do not commit secrets” playbook + recommended `.env` patterns

### 10) Next.js specific guides (if migrating)
- App Router integration patterns:
  - Server Components fetch (preferred)
  - Route Handlers proxy
  - Static generation per page
- Deployment recipes:
  - Vercel env vars
  - Netlify env vars
  - GitHub Actions secrets

### 11) “Glossary & FAQs”
Add a lightweight FAQ:
- “Why is my entry not showing?”
- “How do I find the Entry UID?”
- “What’s the difference between Stack API key and Delivery token?”
- “What host do I use for EU/Azure?”

---

## In‑product help to build / improve

### 1) Connection wizard (guided setup)
An in-product “Connect Contentstack” wizard that:
- Asks for host, API key, environment, delivery token (or server-side credentials)
- Validates them with a **test request** and shows results
- Stores config safely (or instructs to set env vars)

### 2) “Test connection” + diagnostics panel
A single button that checks:
- Correct host (CDN)
- Token validity (401/403)
- Environment mismatch
- Entry exists (404)
- Shows parsed errors with “what to do next”

### 3) Field mapping assistant (schema-aware)
If using modular blocks (like `sections[]`):
- Show detected section keys (`hero_section`, `feature_grid`, …)
- Let users map “Hero title” → `hero_section.headline` etc.
- Warn when fields resolve to empty strings/null

### 4) Inline “Where do I find this?” help
Beside each config field:
- Short tooltip + “Open in Contentstack” deep link if possible
- Copy for common pitfalls (UID vs label)

### 5) Publish status visibility
In UI where users choose an entry:
- Show whether it’s published to the selected environment
- Provide a “publish now” prompt (or instructions) if not

### 6) Live preview / content inspection
Provide a panel that shows:
- Raw entry JSON (redacted where needed)
- Resolved values that will appear on the page
- Which section rendered which parts of the UI

### 7) Safe defaults & guardrails
- Warn users if they enable client-side mode with non-readonly tokens
- Warn if they paste tokens into files that are likely to be committed
- Warn if host is management host

### 8) Templates / starters inside the UI
- “Create recommended Content Type” templates:
  - Homepage modular sections
  - Blog post
- Starter entries with prefilled sample content

### 9) Embedded help resources
- Contextual links:
  - “Delivery API basics”
  - “Publishing to environments”
  - “Finding UIDs”
  - “Local preview troubleshooting”

---

## Assets to produce (non-text)
- Short screen recordings (2–5 minutes):
  - Finding UIDs
  - Creating a delivery token
  - Publishing to an environment
  - Debugging empty responses
- One-page diagrams:
  - Runtime vs build-time vs proxy architecture
  - Data flow: Contentstack → API → app render

