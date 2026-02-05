# Generic Guide (Self‑Serve): Model a Website + Connect it to Contentstack

This guide is written for teams to follow **without AI** and without contacting support. It focuses on practical, repeatable steps and “verify before you code”.

References (official docs):
- Contentstack docs: `https://www.contentstack.com/docs`
- Fetch content (Content Delivery API): `https://www.contentstack.com/docs/developers/fetch-content`

---

## What you’ll accomplish

By the end you will have:
- A Contentstack **content model** (Content Types + fields) that matches your website.
- Entries created and **published** to the correct **Environment** (and locale, if used).
- A working, copy/paste **curl** request that returns your content from the **Delivery API**.
- A reliable website integration using one of the standard architectures (client/server/build-time).

---

## 0) Choose an integration approach (decision table)

Pick the approach that matches your security and delivery needs.

| Approach | Best for | Where content is fetched | Tokens visible to website visitors? |
|---|---|---|---|
| **Client-side (fastest)** | Public marketing content, fastest setup | Browser | **Yes** (Delivery Token is public in the JS bundle) |
| **Server-side runtime** | Private tokens + dynamic pages | Server (SSR / API route) | **No** |
| **Build-time generation** | Static deploy + private tokens + best perf | Build step / CI | **No** |
| **Serverless proxy** | Static frontend + private tokens + runtime freshness | Serverless function | **No** |

If you must keep tokens private, choose **Server-side runtime** or **Build-time generation**.

---

## 1) Collect required values (and where to find them)

You will need:
- **Stack API Key**
- **Delivery Token** (Delivery Token, not Management Token)
- **Environment** name (e.g., `staging`, `production`)
- **Content Type UID** (e.g., `homepage`, `page`, `blog_post`)
- **Entry UID** (recommended for homepage)
- **Field UIDs** for all fields you will render (UIDs ≠ labels)

### 1.1 CDN host vs Management host (critical)

The Content Delivery API uses a **CDN host**, commonly:
- NA: `cdn.contentstack.io`
- EU: `cdn-eu.contentstack.com`

Do **not** use `api.contentstack.io` for Delivery API fetches (that host is for management APIs).

### 1.2 Contentstack UI click paths (typical)

Contentstack UI labels vary slightly by plan, but these paths are common:

- **Stack API Key**
  - In your Stack: **Settings → Stack Settings** (or **Settings → General**) → copy **API Key**

- **Delivery Token**
  - **Settings → Tokens → Delivery Tokens**
  - Create/select a token → copy the **Delivery Token**

- **Environment**
  - **Settings → Environments**
  - Copy the environment name exactly (case-sensitive)

- **Content Type UID + Field UIDs**
  - **Content Models / Content Types** → open your content type
  - Look for the **UID** for the content type and each field

- **Entry UID**
  - **Content** → open an entry → look for **UID / Entry UID** in the entry details panel

If you can’t find a UID: search the Contentstack UI for “UID” or “API Identifier” within the content type/field settings.

---

## 2) Model your website content in Contentstack

There are many ways to model content. The key is to pick a model that matches your UI and your team workflow.

### 2.1 Recommended content types (common websites)

#### A) Homepage
Content Type UID example: `homepage`

Two common patterns:

**Option 1 — Flat fields (simplest)**
- `hero_headline`
- `hero_subheadline`
- `hero_primary_cta_label`
- `hero_primary_cta_url`
- `hero_secondary_cta_label`
- `hero_secondary_cta_url`
- `trusted_by_text`

Pros: easy to wire  
Cons: less flexible if homepage layout changes often

**Option 2 — Modular sections (most flexible)**

Use a `sections[]` style model (array of blocks), e.g.:
- `hero_section` (headline, description, CTAs, media)
- `feature_grid` (section_title, features[])
- `testimonial_section` (quote, person_name, person_role, media, CTA)
- `blog_highlights_section` (section_title, section_subtitle, tabs/filters)

Pros: matches modern composable websites  
Cons: requires a section-mapping layer in code

#### B) Generic Page (About, Pricing, etc.)
Content Type UID example: `page`
- `title`
- `slug` (required)
- `seo` (group; see below)
- `body` (Rich Text or Markdown)

#### C) Blog Post
Content Type UID example: `blog_post`
- `title`
- `slug` (required)
- `excerpt`
- `category` (or taxonomy)
- `published_at`
- `read_time`
- `seo` (group)
- `body` (Rich Text or Markdown)

### 2.2 Recommended SEO group (for page-like types)

Add a `seo` group to `homepage`, `page`, and `blog_post`:
- `meta_title`
- `meta_description`
- `open_graph_title`
- `open_graph_description`
- `open_graph_image` (asset; optional)

---

## 3) Create entries + publish correctly

### 3.1 Create entries
- Create an entry for each content type you need (homepage, pages, blog posts).
- Fill required fields.

### 3.2 Publish to an Environment (required for Delivery API)

The Delivery API usually returns content that is **published to the specific environment** you request.

Checklist:
- Entry is **published**
- Published to the correct **environment** (e.g., `staging`)
- If localization is enabled: published in the correct **locale**

### 3.3 If your stack uses localization

Make sure you know:
- the default locale (commonly `en-us`)
- which locales are published
- whether you are requesting a locale explicitly

---

## 4) Verify Delivery API with curl (before touching code)

This step prevents most integration issues.

### 4.1 Get entry by UID (recommended for homepage)

Copy/paste and fill in:

```bash
CDN_HOST="cdn.contentstack.io"
API_KEY="YOUR_STACK_API_KEY"
DELIVERY_TOKEN="YOUR_DELIVERY_TOKEN"
ENVIRONMENT="staging"
CONTENT_TYPE_UID="homepage"
ENTRY_UID="YOUR_ENTRY_UID"

curl -sS "https://${CDN_HOST}/v3/content_types/${CONTENT_TYPE_UID}/entries/${ENTRY_UID}?environment=${ENVIRONMENT}" \
  -H "api_key: ${API_KEY}" \
  -H "access_token: ${DELIVERY_TOKEN}" | head -c 2000
```

Expected:
- HTTP 200
- JSON containing an `entry` object
- The `entry.uid` equals your `ENTRY_UID`

### 4.2 Query entries by slug (recommended for pages/blog)

```bash
CDN_HOST="cdn.contentstack.io"
API_KEY="YOUR_STACK_API_KEY"
DELIVERY_TOKEN="YOUR_DELIVERY_TOKEN"
ENVIRONMENT="staging"
CONTENT_TYPE_UID="blog_post"
SLUG="my-first-post"

curl -sS "https://${CDN_HOST}/v3/content_types/${CONTENT_TYPE_UID}/entries?environment=${ENVIRONMENT}&query={\"slug\":\"${SLUG}\"}&limit=1" \
  -H "api_key: ${API_KEY}" \
  -H "access_token: ${DELIVERY_TOKEN}" | head -c 2000
```

Expected:
- An `entries` array with one entry matching the slug

### 4.3 How to interpret failures quickly

- **401 Unauthorized**: wrong token, token not a Delivery Token, token disabled, wrong host
- **403 Forbidden**: permissions/environment mismatch, token doesn’t allow the environment
- **404 Not Found**: wrong host region, wrong content type UID, wrong entry UID
- **200 but missing fields**: field UID mismatch, wrong locale, content not published, empty content

Do not proceed to wiring code until these curl commands succeed.

---

## 5) Wire Contentstack into your website (implementation patterns)

### Pattern A — Client-side fetch (fastest)

Use only if:
- your content is public, and
- you accept that the Delivery Token is visible in browser code.

Implementation rules:
- Use CDN host for Delivery API
- Keep a static fallback (render default content if fetch fails)
- Map content by **field UID**, not label

High-level pseudo-code:

```js
// 1) Fetch entry from Content Delivery API
// 2) Extract the fields you need
// 3) Render into the UI (DOM or components)
// 4) Handle failure gracefully (fallback)
```

### Pattern B — Server-side runtime (private tokens)

Use if you need tokens private and content loaded at request time.

Examples:
- Next.js Server Components fetching content
- Express/Koa server that fetches content and renders templates
- Route handler / API route proxying Delivery API calls to the browser

Rules:
- Keep tokens in server-only env vars
- Add caching where appropriate

### Pattern C — Build-time generation (private tokens + static output)

Use if you deploy a static site but want tokens private.

Rules:
- Fetch content in CI/build step using env vars (not in browser)
- Generate HTML files (or JSON payloads) from templates
- Rebuild when content changes (or use a webhook-triggered build)

---

## 6) Map content → UI reliably (avoid “content not showing”)

### 6.1 Always map by **field UID**

If your code expects `hero_title` but the Delivery API payload has `headline`, the UI will not show content.

### 6.2 Modular `sections[]` models require a section resolver

If your entry has:
- `entry.sections[].hero_section.headline`

Your code must:
1) find the item inside `sections[]` whose key is `hero_section`
2) map `headline` into your hero title UI
3) repeat for each section type you support

Recommendation:
- keep a single mapping file that defines:
  - supported section keys
  - required fields per section
  - fallbacks when fields are missing

---

## 7) Local preview (known-good commands)

### 7.1 Static HTML/CSS/JS

```bash
python3 -m http.server 5173
```

Open:
- `http://127.0.0.1:5173/`

Fallback if Python is blocked:

```bash
npx serve . -p 5173
```

### 7.2 Next.js

```bash
npm install
npm run dev
```

---

## 8) Troubleshooting (quick table)

| Symptom | Likely cause | What to do next |
|---|---|---|
| 401 | wrong token/host | confirm CDN host + Delivery Token |
| 403 | permission/environment mismatch | confirm environment + token permissions |
| 404 | wrong UIDs/host region | verify content type UID, entry UID, region host |
| Entry returns but fields empty | UID mismatch / locale / unpublished | confirm field UIDs + locale + publish state |

### “My site isn’t showing entry content”

Checklist:
- Confirm your curl validation commands work.
- Confirm the entry is published to the environment you’re using.
- Confirm your code is mapping the correct field UIDs.
- If build-time: confirm you reran the build after publishing.

---

## 9) Acceptance checklist (what “done” looks like)

- Homepage renders content from the intended `ENTRY_UID`
- Pages/blog resolve by slug correctly
- Unpublished entries do not show up unexpectedly
- Switching environment (`staging` → `production`) works as expected
- Locale behavior is correct (if enabled)
- Secrets are handled correctly for your chosen approach

---

## 10) FAQ

### “I changed content, but the website didn’t update.”
- Client-side: refresh (and check caching/CDN)
- Server-side: refresh (ensure fetch is not over-cached)
- Build-time: rebuild/redeploy (or trigger build via webhook)

### “Which host do I use?”
- For Delivery API use a CDN host (commonly `cdn.contentstack.io`).
- Do not use `api.contentstack.io` for fetching delivery content.

# Generic Guide: Model a Website + Connect it to Contentstack (Self‑Serve)

This guide is designed for users to follow **without AI** and without needing support. It walks through:
- how to model content in Contentstack
- how to publish content correctly (environments/locales)
- how to validate the Delivery API
- how to wire a website to Contentstack (static sites, Next.js, and other frameworks)
- how to troubleshoot common issues

Contentstack docs you may reference:
- Documentation home: `https://www.contentstack.com/docs`
- Fetch content (Delivery API): `https://www.contentstack.com/docs/developers/fetch-content`

---

## 0) Choose your integration approach (decision table)

Pick the approach that matches your security and delivery needs:

| Approach | When to use | Where content is fetched | Tokens visible to users? |
|---|---|---|---|
| **Client-side (fastest)** | Public content, fastest setup | Browser | **Yes** (Delivery Token is public) |
| **Server-side runtime** | Tokens must remain private; dynamic pages | Server (SSR / Route Handler / API) | **No** |
| **Build-time generation** | Static deployment; tokens private; best performance | Build step / CI | **No** |
| **Serverless proxy** | Static frontend, but private tokens and runtime fetch | API route / Function | **No** |

If you must keep tokens private, **avoid client-side fetching**.

---

## 1) Gather the required values (what you will need)

You will need these values from Contentstack:

- **Stack API Key**
- **Delivery Token** (from a Delivery Token, not Management)
- **Environment name** (e.g., `staging`, `production`)
- **Content Type UID** (e.g., `homepage`, `page`, `blog_post`)
- **Entry UID** (optional but recommended for “homepage”)
- **Field UIDs** for all fields you plan to render (UIDs ≠ labels)

### Important: CDN host vs Management host

Content Delivery API uses a **CDN host**, commonly:
- NA: `cdn.contentstack.io`
- EU: `cdn-eu.contentstack.com`

Do **not** use the management host (`api.contentstack.io`) for Delivery API content retrieval.

---

## 2) Model your website content (recommended content types)

### A) Homepage (recommended)

You can model homepages in two common ways:

#### Option 1 — Flat fields (simple)
Content Type UID: `homepage`

Recommended fields (UIDs in parentheses):
- Hero headline (`hero_headline`)
- Hero subheadline (`hero_subheadline`)
- Primary CTA label (`hero_primary_cta_label`)
- Primary CTA URL (`hero_primary_cta_url`)
- Secondary CTA label (`hero_secondary_cta_label`)
- Secondary CTA URL (`hero_secondary_cta_url`)
- “Trusted by” text (`trusted_by_text`)

Pros: easiest to wire  
Cons: less flexible when the homepage layout changes

#### Option 2 — Modular sections (flexible; matches many sites)
Content Type UID: `homepage`

Use a modular “sections” model (array of section blocks). Example blocks:
- `hero_section` (headline, description, ctas, media)
- `feature_grid` (section_title, features[])
- `testimonial_section` (quote, person_name, person_role, media)
- `blog_highlights_section` (section_title, section_subtitle, tabs/filters)

Pros: flexible and scalable  
Cons: your website integration must correctly map `sections[]` → UI regions

### B) Generic Page (about, pricing, etc.)
Content Type UID: `page`

Suggested fields:
- Title (`title`)
- Slug (`slug`) **required**
- SEO group (`seo`)
- Body (Rich Text or Markdown) (`body`)

### C) Blog Post
Content Type UID: `blog_post`

Suggested fields:
- Title (`title`)
- Slug (`slug`) **required**
- Excerpt (`excerpt`)
- Category (`category`) (or taxonomy)
- Published date (`published_at`)
- Read time (`read_time`)
- Body (Rich Text or Markdown) (`body`)
- SEO group (`seo`)

---

## 3) Create content + publish correctly

### A) Create Entries
- Create an entry for each content type you need (homepage, pages, blog posts).
- Fill required fields.

### B) Publish to an Environment
Delivery API typically returns content that is **published** to a specific **environment**.

Checklist:
- Entry is **published**
- Published to the correct **environment** (e.g., `staging`)
- If localized: published in the correct **locale**

---

## 4) Validate the Delivery API before touching code

This step prevents most integration issues.

### A) Fetch an entry by UID (recommended for homepage)
Use the Delivery API “Get an entry” endpoint.

You should get JSON with an `entry` field.

If you get errors:
- **401/403** → token/host/environment permissions
- **404** → wrong content type UID, entry UID, or region host
- **Empty fields** → wrong locale, unpublished content, or field UID mismatch

### B) Query by slug (recommended for pages/blog)
Use query-based retrieval for `slug`.

Expected: exactly 1 matching entry.

---

## 5) Wire Contentstack into your website (implementation patterns)

### Pattern 1 — Client-side fetch (fastest)
Use this only if:
- content is public, and
- exposing a Delivery Token is acceptable

High-level flow:
1) Store stack config in a JS config file or environment-injected config.
2) On page load, call Delivery API.
3) Render content into known DOM targets.

Implementation tips:
- Keep a **static fallback** if the API call fails
- Use a **mapping layer** (field paths → UI targets)

### Pattern 2 — Server-side runtime fetch (private tokens)
Use this if you need tokens private and want content at runtime.

Examples:
- Next.js Server Components fetching directly from Contentstack
- API route that proxies Contentstack response to the client

Implementation tips:
- Keep tokens in server-only environment variables
- Cache responses (if appropriate)

### Pattern 3 — Build-time generation (private tokens; static output)
Use this if you want static hosting (best performance) and private tokens.

High-level flow:
1) Keep your HTML/React templates with placeholders.
2) In a build script, fetch Contentstack content using env vars.
3) Generate final HTML pages (or JSON data files).
4) Deploy generated output.

Implementation tips:
- Always pin the homepage to a specific entry UID
- Add a debug mode that prints “which fields were used”

---

## 6) Mapping content → UI (how to avoid “content not showing”)

### A) Always map by **field UID** (not label)
If your code expects `hero_title` but your content type uses `headline`, values will be empty.

### B) For modular “sections[]” models
Your integration must:
- find the right section block (e.g., `hero_section`)
- map nested fields (e.g., `hero_section.headline`) into UI targets

Suggested practice:
- keep a single “mapping file” where you define:
  - which section keys you support
  - which fields are required per section
  - fallbacks if fields are empty

---

## 7) Troubleshooting (quick table)

### A) API errors

| Symptom | Likely cause | Fix |
|---|---|---|
| 401 Unauthorized | wrong token/host, token disabled | confirm CDN host + Delivery Token |
| 403 Forbidden | permissions/environment mismatch | confirm environment and token access |
| 404 Not Found | wrong content type UID / entry UID / region host | verify UIDs + region host |
| API returns entry but fields are blank | wrong field UIDs, wrong locale, not published | verify field UIDs + locale + publish status |

### B) Content is “not from the entry”
Checklist:
- Are you accidentally using a mock mode or cached content?
- Is the entry published to the environment you’re using in the API call?
- Are you fetching the correct entry UID?
- Do the field UIDs in code match the Delivery API payload keys?

### C) Local preview doesn’t work
Checklist:
- Is your local server still running?
- Try a different port (e.g. 5173, 3000, 8080)
- Use an alternate server command if needed (Python vs Node)

---

## 8) What “good” looks like (acceptance checklist)

Before you consider the integration complete, confirm:
- Homepage renders content from the intended entry UID
- Pages/blog resolve by slug correctly
- Unpublished entries do not appear unexpectedly
- Environment switching works (staging vs production)
- Locale behavior is correct (if enabled)
- Secrets/tokens are stored appropriately for your chosen approach

