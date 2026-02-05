# Contentstack Integration: Documentation Gaps / Gotchas (Vortex)

This is a running list of **documentation gaps** we’ve observed while wiring this codebase to Contentstack. The goal is to prevent users from getting stuck when configuring Contentstack + local preview + deployment.

## Content model assumptions (most common blocker)

- **Homepage schema mismatch**  
  Our earlier guidance assumed flat fields like `hero_title`, but the actual homepage entry payload is nested under `entry.sections[]` with blocks like `hero_section`, `feature_grid`, `testimonial_section`, and `blog_highlights_section`.  
  Users get stuck when the code expects flat fields but the content type is modeled as modular blocks.

- **UID vs display name confusion**  
  Contentstack uses **field UIDs** (API keys) for delivery payload keys. Users often copy the field **label** instead of the **UID** and then wonder why values are empty / fall back.

- **Required fields not listed**  
  We should explicitly list required fields (and which are optional) for each rendered section (hero CTAs, features, testimonial, etc.).

## Entry selection + publishing pitfalls

- **Which entry is fetched if no entry UID is specified**  
  If the integration fetches the “first entry”, users don’t know what “first” means (sorting/order) and may see “wrong content”.

- **Published vs draft**  
  Delivery API typically serves **published** content for a specific **environment**. Users get stuck when they edited an entry but didn’t publish it to the target environment.

- **Environment name mismatch**  
  A small mismatch (e.g. `staging` vs `Staging`) results in empty responses or missing content.

## Region / host confusion (CDN vs Management)

- **CDN host vs Management host**  
  Delivery API calls should use a **CDN host** (e.g. `cdn.contentstack.io` / `cdn-eu.contentstack.com`).  
  Users commonly paste `api.contentstack.io` (Management API host) and requests fail.

- **No crisp region “cheat sheet”**  
  Documentation should include a quick mapping table: NA vs EU vs Azure hosts and where to find your stack’s region in Contentstack.

## Runtime vs build-time approach confusion (security + behavior)

- **Modes aren’t clearly separated**  
  We’ve discussed both:
  - **Client-side fetch** (fastest; Delivery Token is visible in browser)
  - **Build-time / server-side fetch** (tokens stay private)
  
  Users get stuck when they run steps from the wrong mode or accidentally mix them.

- **Security implications not emphasized enough**  
  If using client-side fetching, the Delivery Token must be treated as **public** and should be **read-only** and only for public content.

- **Mock mode / local fallback confusion**  
  If a local mock mode exists, users can forget it’s enabled and think Contentstack isn’t returning real content.

## Local preview friction

- **Port binding / server start issues**  
  Users can hit OS permission issues or port conflicts. Docs should include:
  - recommended fallback ports
  - a second “known-good” server command
  - reminder to keep the server running (don’t stop it accidentally)

## Troubleshooting checklist is missing

Users frequently need a short checklist for Delivery API failures:
- **401/403**: wrong token, wrong environment, not a delivery token, permissions
- **404**: wrong content type UID, wrong entry UID
- **Empty content**: entry not published, environment mismatch, locale mismatch, fields not present

Also helpful:
- A **curl** example to validate the Delivery API outside the app
- A “where to find these values” section (API key, delivery token, environment, entry UID, content type UID)

## Users without AI support (where they will get stuck)

These are gaps that become much more painful when users **don’t** have an assistant to translate errors into next steps.

### Missing “exact click path” instructions in Contentstack UI

- **Where to find the Stack API Key**
- **Where to create / locate a Delivery Token** (and confirm it’s a Delivery Token, not Management)
- **Where to find the Environment name** and confirm spelling/case
- **Where to find the Content Type UID** and **field UIDs** (not labels)
- **Where to find Entry UID** and publishing status

Without explicit UI paths (and screenshots), users waste time hunting through the product.

### No “first-time setup” checklist (in the order users actually need)

We should have a short checklist that starts with “do you have the right model?” and ends with “confirm API returns content”.

Suggested sequence:
- Confirm stack region → choose correct **CDN host**
- Create/confirm **Environment**
- Create/confirm **Content Type UID** and field UIDs
- Create **Entry** and fill required fields
- **Publish** to the environment
- Validate with **curl** / API test
- Only then wire into app config and local preview

### Error-message mapping is missing

Users need a table like:
- **401 Unauthorized** → wrong token, token disabled, wrong host
- **403 Forbidden** → token scope/permissions, environment mismatch
- **404 Not Found** → wrong content type UID / entry UID / locale
- **Empty response** → entry not published to environment, querying wrong locale, field UIDs don’t exist

Include “what to check” + “what to do next” for each.

### “Publish details” and environment publishing aren’t explained

Many users assume “saved = available via API”. They need:
- A clear distinction between **draft**, **published**, **scheduled**
- How “publish to environment” affects Delivery API results
- How to verify publication in Contentstack UI

### Locale + fallback behavior is unclear

If locale is enabled:
- Users need to know which locale is default
- How to publish per locale
- How to request a specific locale (or confirm the API defaults)

### Runtime vs build-time choice needs a decision tree

Without AI, users mix approaches. The docs should include a simple decision tree:
- Need tokens private? → server-side / build-time only
- OK with public token (read-only)? → client-side is acceptable

And include “what files to edit” for each mode.

### Local preview guidance needs “known-good” commands and port fallbacks

Users get blocked on:
- Port conflicts
- OS permission issues
- Server not running (they stopped it)

Docs should include:
- At least 2 server options (Python + Node)
- A recommended port list (e.g. 5173, 3000, 8080)
- A “how to tell it’s running” snippet

### Security cautions need to be explicit and repeated

Users will paste secrets into repos by accident.
Docs should include:
- “Never commit tokens” reminders
- Recommended use of CI secrets / `.env.local`
- For client-side mode: “Delivery Token is public; use read-only + only public content”

## Locales (often overlooked)

- Content can be localized. If locale defaults differ, users may see missing values.
- Docs should specify:
  - default locale behavior
  - how to request a specific locale (if used)

## Assets / images

- Many fields can be assets (e.g. Open Graph image, hero media). Docs should cover:
  - how asset URLs appear in Delivery payloads
  - null/empty asset handling
  - safe rendering patterns

## Next.js integration guidance (if migrating)

If converting to Next.js, users need clear guidance on:
- where secrets go (`.env.local` / hosting provider secrets)
- avoiding shipping secrets to the client (no `NEXT_PUBLIC_*` for secrets)
- where Contentstack fetch should live (server components / route handlers)
- how to generate static pages vs SSR vs ISR

---

## Help materials roadmap

See `HELP_MATERIALS_ROADMAP.md` in this folder for a concrete list of **Docs + in-product** help materials we can create/improve to prevent users from getting stuck.

## Generic integration guide

See `GENERIC_CONTENTSTACK_INTEGRATION_GUIDE.md` in this folder for a step-by-step, self-serve guide users can follow to model their website and connect it to Contentstack without AI or support.

