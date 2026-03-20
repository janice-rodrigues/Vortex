# Quickstart (JS/TS‑first): Build and Deploy a Website with Contentstack + Launch

This guide is written for junior developers. It uses a **default path that matches the most common stack**:

- **JavaScript/TypeScript**
- **Next.js**
- **Static export (build‑time fetching)**
- **Launch hosting**

You can still use Contentstack from **any language** (it’s an HTTP API). This guide keeps a universal checklist, and then gives you a copy/paste‑friendly JS/TS implementation.

References (official docs):
- Contentstack docs: `https://www.contentstack.com/docs`
- Content Delivery API (Fetch content): `https://www.contentstack.com/docs/developers/apis/content-delivery-api`
- Regions / API endpoints: `https://www.contentstack.com/docs/developers/contentstack-regions/api-endpoints`
- Launch: `https://www.contentstack.com/docs/developers/launch`

---

## What you’ll accomplish (definition of success)

You are done when:
- `curl` returns **HTTP 200** and you see your entry JSON
- Your site renders Contentstack content locally
- Launch builds successfully
- Your Launch URL shows real CMS content (not a 404, not placeholder copy)

---

## 0) Prerequisites (minimum)

- A Contentstack account with permission to create a Stack
- Permission to create Environments and Delivery Tokens
- A Git repo connected to your site project
- Ability to run terminal commands and set environment variables

---

## 1) Glossary (quick)

- **Stack**: your Contentstack project/workspace.
- **Content Type**: a schema defining fields (example UIDs: `homepage`, `page`, `blog_post`).
- **Entry**: content created from a Content Type.
- **UID**: API identifier. **UID ≠ label** (field UID is the JSON key you’ll see in the API response).
- **Environment**: a publishing target (e.g., `staging`, `production`).
- **Delivery Token**: token used to read content via the **Content Delivery API**.
- **CDN Host**: Delivery API host (region‑specific).

---

## 2) Pick the integration mode (don’t mix modes)

| Mode | When to use | Where fetch happens | Are tokens exposed to browsers? |
|---|---|---|---|
| **Client-side** | Only public content, fastest demo | Browser | **Yes** |
| **Server runtime (SSR / API route)** | Runtime freshness, tokens private | Server | **No** |
| **Build-time (static generation/export)** | Static hosting, best perf, tokens private | CI/build step | **No** |

**Default for this guide (recommended): Build‑time.**  
It works well for static hosting and keeps tokens private.

---

## 3) Contentstack setup (Stack → Environment → Model → Entry → Publish)

### 3.1 Create a Stack

- Log in to Contentstack
- Click **Create New Stack**
- Choose the correct **Region** (important)
- Create the stack

Record (you will need this later):
- **Stack API Key**
- **Region**

### 3.2 Create (or confirm) Environments

In **Settings → Environments**:
- Create `staging` and `production` (or confirm they exist)
- Copy the environment names exactly (case‑sensitive)

### 3.3 Model content from the UI (don’t start in Contentstack)

Do a quick “content audit” from your design:
- List the sections per page (hero, features, testimonials, footer, SEO)
- Identify what repeats (cards, quotes, logo lists)

Then model in Contentstack:
- Create Content Types (common site starter set):
  - `homepage`
  - `page` (generic pages)
  - `blog_post` (optional)
- Add a consistent **SEO group** to page-like types:
  - `meta_title`
  - `meta_description`
  - `open_graph_title`
  - `open_graph_description`
  - `open_graph_image` (Asset)

For page layout sections, pick one:
- **Flat fields** (simplest wiring, less flexible)
- **Modular sections** (most flexible, requires section mapping in code)

Important rules:
- **Write down UIDs** (content type UIDs + field UIDs)
- **Do not rename UIDs** after code integration starts

### 3.4 Create an entry and publish it

- Create an entry for `homepage`
- Fill required fields
- Click **Publish** (not just Save)
- Publish to the correct **Environment** (start with `staging`)
- Publish the correct **Locale** (if localization is enabled)

---

## 4) Create a Delivery Token (read‑only)

In **Settings → Tokens → Delivery Tokens**:
- Create a Delivery Token
- Assign it to the environment you publish to (e.g., `staging`)
- Copy the token value

You should now have:
- Stack API Key
- Delivery Token
- Environment name
- Content Type UID (e.g., `homepage`)
- Entry UID (for your homepage entry)

---

## 5) Choose the correct Delivery API host (region cheat sheet)

Use the **Content Delivery API CDN host** (not the management API host).

Common CDN hosts:
- **North America**: `cdn.contentstack.io`
- **Europe**: `eu-cdn.contentstack.com`

Do **not** use:
- `api.contentstack.io` (Management APIs)

If you’re unsure, use the official endpoint table:
- `https://www.contentstack.com/docs/developers/contentstack-regions/api-endpoints`

---

## 6) Validate the Delivery API with curl (do this before writing code)

### 6.1 Fetch a single entry by UID

```bash
CDN_HOST="cdn.contentstack.io"
API_KEY="<STACK_API_KEY>"
DELIVERY_TOKEN="<DELIVERY_TOKEN>"
ENVIRONMENT="staging"
CONTENT_TYPE_UID="homepage"
ENTRY_UID="<ENTRY_UID>"

curl -sS "https://${CDN_HOST}/v3/content_types/${CONTENT_TYPE_UID}/entries/${ENTRY_UID}?environment=${ENVIRONMENT}" \
  -H "api_key: ${API_KEY}" \
  -H "access_token: ${DELIVERY_TOKEN}"
```

Expected:
- HTTP 200
- JSON with an `entry` object

Do not continue until this works.

### 6.2 Query an entry by slug (recommended for `page` / `blog_post`)

Most sites do not hardcode every page by Entry UID. A common pattern is:
- Homepage: fetch by **Entry UID**
- Other pages/posts: fetch by **slug**

```bash
CDN_HOST="cdn.contentstack.io"
API_KEY="<STACK_API_KEY>"
DELIVERY_TOKEN="<DELIVERY_TOKEN>"
ENVIRONMENT="staging"
CONTENT_TYPE_UID="page"
SLUG="about"

curl -sS --get "https://${CDN_HOST}/v3/content_types/${CONTENT_TYPE_UID}/entries" \
  -H "api_key: ${API_KEY}" \
  -H "access_token: ${DELIVERY_TOKEN}" \
  --data-urlencode "environment=${ENVIRONMENT}" \
  --data-urlencode "query={\"slug\":\"${SLUG}\"}" \
  --data-urlencode "limit=1"
```

Expected:
- HTTP 200
- JSON with an `entries` array containing one matching entry

---

## 7) Default implementation path (recommended): Next.js + build-time fetching + static export

This is the most common “junior‑friendly” path because it’s copy/paste‑able and keeps tokens private.

### 7.1 Set environment variables locally

Create `.env.local` (do not commit):

```bash
CONTENTSTACK_API_KEY=""
CONTENTSTACK_DELIVERY_TOKEN=""
CONTENTSTACK_ENVIRONMENT="staging"
CONTENTSTACK_CDN_HOST="cdn.contentstack.io"
CONTENTSTACK_CONTENT_TYPE_UID="homepage"
CONTENTSTACK_ENTRY_UID=""
```

### 7.2 Fetch the homepage entry (server-only)

In Next.js, fetch from the server (never from client components if you want tokens private):

- Build a URL like:
  - `https://${CONTENTSTACK_CDN_HOST}/v3/content_types/${CONTENTSTACK_CONTENT_TYPE_UID}/entries/${CONTENTSTACK_ENTRY_UID}?environment=${CONTENTSTACK_ENVIRONMENT}`
- Send headers:
  - `api_key: <STACK_API_KEY>`
  - `access_token: <DELIVERY_TOKEN>`

Copy/paste starter (server-only helper):

```ts
// lib/contentstack.ts
type ContentstackEntryResponse<TEntry> = { entry: TEntry };

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function fetchHomepageEntry<TEntry>(): Promise<TEntry> {
  const cdnHost = requiredEnv("CONTENTSTACK_CDN_HOST");
  const apiKey = requiredEnv("CONTENTSTACK_API_KEY");
  const deliveryToken = requiredEnv("CONTENTSTACK_DELIVERY_TOKEN");
  const environment = requiredEnv("CONTENTSTACK_ENVIRONMENT");
  const contentTypeUid = requiredEnv("CONTENTSTACK_CONTENT_TYPE_UID");
  const entryUid = requiredEnv("CONTENTSTACK_ENTRY_UID");

  const url =
    `https://${cdnHost}/v3/content_types/${contentTypeUid}/entries/${entryUid}` +
    `?environment=${encodeURIComponent(environment)}`;

  const res = await fetch(url, {
    headers: {
      api_key: apiKey,
      access_token: deliveryToken,
    },
    // Build-time / static-friendly defaults
    cache: "force-cache",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Contentstack fetch failed (${res.status}): ${body}`);
  }

  const json = (await res.json()) as ContentstackEntryResponse<TEntry>;
  return json.entry;
}
```

Example usage (App Router server component):

```tsx
// app/page.tsx
import { fetchHomepageEntry } from "@/lib/contentstack";

export default async function HomePage() {
  const entry = await fetchHomepageEntry<any>();
  return (
    <main>
      <h1>{entry?.title ?? "Missing homepage title"}</h1>
    </main>
  );
}
```

Important:
- Keep secrets **server-only** (do not use `NEXT_PUBLIC_*` for tokens)
- If you model pages with modular `sections[]`, you must map section blocks → UI (don’t assume flat fields)

### 7.3 Static export output (what Launch will publish)

For a static export, your build should output an export folder (commonly `out/`).

Your Launch configuration should match your framework output:
- **Build command**: `npm run build`
- **Publish/output directory**: `out` (only if your build produces `out/`)

If your project outputs `dist/` or `build/` instead, publish that folder.

### 7.4 Rebuild rule (important)

If you use build-time fetching:
- Publishing in Contentstack **does not update your site** until you rebuild/redeploy
- Later, you can add a webhook to trigger Launch rebuilds automatically

---

## 8) Deploy on Launch (static export)

In Launch:
- Create a new project
- Connect your Git repo + branch
- Configure:
  - **Build command** (example: `npm run build`)
  - **Publish/output directory** (example: `out`)
- Add the same `CONTENTSTACK_*` environment variables in Launch

Common “it deployed but I see 404” causes:
- Output directory mismatch (Launch is serving the wrong folder)
- Your build didn’t actually produce static output

---

## 9) If you are NOT using JavaScript/TypeScript (translation guide)

Everything up to Step 6 stays identical. Only Step 7 changes.

To integrate in any language/framework, you always do the same three things:

1) **HTTP GET** the Delivery API URL (same endpoint as the `curl` command)  
2) Send the same headers (`api_key`, `access_token`)  
3) Parse JSON and render templates, then output your build folder

Launch only needs:
- The **build command** for your toolchain
- The **publish directory** your build produces (`dist/`, `build/`, `public/`, etc.)
- Your env vars as secrets

---

## 10) Troubleshooting (fast)

- **401 Unauthorized / 403 Forbidden**
  - Using a **Delivery Token** (not Management Token)?
  - Token assigned to the correct environment?
  - Correct Stack API Key?
  - Correct CDN host for your region?

- **404 Not Found**
  - Wrong Content Type UID or Entry UID
  - Entry not published to the environment you’re querying

- **200 OK but content is “missing”**
  - Wrong **field UIDs** in your code (UIDs ≠ labels)
  - Wrong locale (if localization is enabled)
  - Build-time mode: you forgot to rebuild after publishing

