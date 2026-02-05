# Contentstack → Build-time generation (homepage only)

This website is static at runtime. We fetch Contentstack **during build** and generate `index.html` from `index.template.html`, so **tokens remain private**.

## 1) Configure environment variables (locally / CI)

Copy `contentstack.env.example` into your environment (or CI secrets). Do **not** commit real tokens.

If you want a single “staging env file” you can source locally, use:
- `contentstack.staging.env` (fill in values, then load it before running the generator)

Required:
- `CONTENTSTACK_API_KEY`
- `CONTENTSTACK_DELIVERY_TOKEN`
- `CONTENTSTACK_ENVIRONMENT`

Optional:
- `CONTENTSTACK_CDN_HOST` (defaults to `cdn.contentstack.io`)
- `CONTENTSTACK_HOMEPAGE_CONTENT_TYPE_UID` (defaults to `homepage`)
- `CONTENTSTACK_HOMEPAGE_ENTRY_UID` (pin a specific entry)
- Field UIDs:
  - `CONTENTSTACK_FIELD_HERO_TITLE` (default `hero_title`)
  - `CONTENTSTACK_FIELD_HERO_SUBTITLE` (default `hero_subtitle`)
  - `CONTENTSTACK_FIELD_TRUSTED_BY_TEXT` (default `trusted_by_text`)

## 2) Run the generator

From the project root:

```bash
node scripts/generate-homepage.mjs
```

### Using the staging env file (local)

```bash
set -a
source contentstack.staging.env
set +a

node scripts/generate-homepage.mjs
```

This will fetch your homepage entry from Contentstack and output `index.html` by replacing placeholders in `index.template.html`:
- `{{HERO_TITLE}}`
- `{{HERO_SUBTITLE}}`
- `{{TRUSTED_BY_TEXT}}`

## Troubleshooting (if content is not coming from your entry)

1) **Make sure you are not in mock mode**
- If `CONTENTSTACK_MOCK_FILE` is set, the generator will use the local JSON instead of Contentstack.
- Unset it before running:

```bash
unset CONTENTSTACK_MOCK_FILE
```

2) **Turn on debug output**

```bash
CONTENTSTACK_DEBUG=1 node scripts/generate-homepage.mjs
```

This prints:
- whether you’re in **mock** or **contentstack** mode
- the **entry keys** returned
- which **field UIDs** were used to populate the homepage placeholders

3) **Field UID mismatch is the most common issue**
If your Content Type uses different field UIDs than "hero_title / hero_subtitle / trusted_by_text",
set the env vars to match your model:
- `CONTENTSTACK_FIELD_HERO_TITLE`
- `CONTENTSTACK_FIELD_HERO_SUBTITLE`
- `CONTENTSTACK_FIELD_TRUSTED_BY_TEXT`

## Notes

- The generator uses the Contentstack Delivery API endpoint:
  - `/v3/content_types/<uid>/entries?environment=...`
- The generated output is plain HTML (strings are HTML-escaped).

