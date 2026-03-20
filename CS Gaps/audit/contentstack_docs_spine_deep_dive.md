## Spine Deep Dive (manual) — highest-impact docs surfaces

This is a qualitative review of the pages most users (and assistants) rely on to integrate Contentstack end-to-end.

References:
- Content Delivery API: `https://www.contentstack.com/docs/developers/apis/content-delivery-api`
- Delivery Tokens: `https://www.contentstack.com/docs/developers/create-tokens/about-delivery-tokens`
- Region endpoints: `https://www.contentstack.com/docs/developers/contentstack-regions/api-endpoints`
- Fetch Content hub: `https://www.contentstack.com/docs/developers/fetch-content`
- Launch hub: `https://www.contentstack.com/docs/developers/launch`
- Launch env vars: `https://www.contentstack.com/docs/developers/launch/environment-variables`

---

### 1) Content Delivery API (CDA) reference

#### What’s good
- **Clear base URL list by region** and explicit distinction between CDA vs CMA.
- Strong “headers not query params” warning (prevents a common security + caching footgun).
- Error code table exists, plus notes on CDN/origin behavior.

#### Gaps (user readability)
- **Task-first examples aren’t promoted to the top**. Juniors need:
  - “Get entry by UID”
  - “Query by slug”
  - “Include references / includes”
  - “Locales”
  - “Common errors → what to check”
  early, before the full reference index.
- Error table is **HTTP-centric**, but the *fixes* are **Contentstack-centric** (env mismatch, unpublished, wrong region host, UID vs label, locale). Those aren’t mapped tightly.
- The CDA page is long and dense; readers don’t get a “golden path” or “minimum viable request”.

#### Gaps (AI readability)
- The page carries a lot of repeated navigation/marketing boilerplate, which increases retrieval noise.
- Assistants often need *one canonical curl* and *one canonical “headers + environment + query” explanation*; those should be easy to extract.

#### Improvements
- Add a top section: **“3 canonical requests”** (curl):
  - Entry by UID
  - Query by slug
  - Query with include references
- Add a top section: **“If you see X, check Y”** table:
  - 401/403 → wrong token type / wrong environment / wrong stack API key
  - 404/422 (“UID not valid”) → wrong content type UID / entry UID / wrong region host / entry unpublished
  - 200 but missing values → UID vs label / locale mismatch / not published to env / caching expectations
- Add a single “don’t mix modes” callout that links to a canonical “Fetch → Render patterns” doc (client vs server vs build-time).

---

### 2) Delivery Tokens

#### What’s good
- Correctly emphasizes **read-only**, **published content**, and **environment scope**.
- Clarifies relationship between **Delivery Tokens** and **Preview Tokens**.

#### Gaps
- Missing a concrete “how to validate token works” snippet (curl) *on the token page itself*.
- Missing an explicit “saved vs published” reminder *right where users are thinking about tokens*.
- Missing a strong “token exposure” decision reminder:
  - if used client-side, treat it as public; prefer server/build-time for private usage.

#### Improvements
- Add “Verify this token” section:
  - the minimal curl to fetch an entry (with placeholders + expected response shape).
- Add a “Common mistakes” section:
  - created token for wrong environment
  - using management token/authtoken with CDA
  - wrong region host

---

### 3) Regions / API endpoints

#### What’s good
- The table is comprehensive and includes multiple products (CDA, CMA, images, assets, etc.).

#### Gaps
- The page is “everything at once” and doesn’t help users answer:
  - “**What region is my stack?**”
  - “**Which one should I use for fetching published content?** (CDA vs CMA)”
- Users under time pressure still paste the wrong host (management host for delivery).

#### Improvements
- Add “Find your stack region” (UI click path + screenshot).
- Add a compact “Most common choices” card:
  - **CDA host** (fetch published content)
  - **CMA host** (management)
  - **Images / Assets** (delivery)
- Add a mini “verification” snippet:
  - a curl that prints out the host being used + status code + top-level keys.

---

### 4) Fetch Content hub

#### What’s good
- The hub correctly points to REST CDA, GraphQL CDA, Sync, Image, and CMA.

#### Gaps
- The hub is a link list, not an onboarding flow.
- No forced “mode” decision (client/server/build-time), so readers mix approaches.

#### Improvements
- Convert the top of the hub into a **decision tree**:
  - Need private tokens? → server/build-time
  - Need runtime freshness? → server/runtime
  - Static hosting? → build-time + webhook-triggered rebuild
- Add “Start here: validate with curl” before SDK/framework links.

---

### 5) Launch docs (env vars + output directory)

#### What’s good
- Environment variables page is clear about **where to set vars**, size limits, and “new deployment required”.

#### Gaps
- The #1 failure mode is “it deployed but 404” (output directory mismatch), which isn’t front-and-center across quickstarts.
- There’s no single cross-framework “Build & Output debugging” checklist.

#### Improvements
- Add a canonical “Build & Output troubleshooting” page and link it from every framework quickstart:
  - output directory mismatch
  - build didn’t produce static output
  - env var changes require redeploy
- Add a “static export vs SSR” decision reminder, since it changes Launch config.

---

### Cross-cutting “docs product” improvements (high leverage)

- **Standardize doc templates** for task pages:
  - Prereqs → Inputs → Steps → Expected output → Troubleshooting → Related
- **Add `llms.txt` / `llms-full.txt`** at the docs root:
  - stable canonical entry points for CDA, tokens, regions, publishing semantics, locales, Launch
- **Add a single canonical “publishing semantics” truth page**:
  - saved vs published vs scheduled
  - environment publishing
  - locale publishing/requests
  - build-time vs runtime update expectations

