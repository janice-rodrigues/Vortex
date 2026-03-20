# Vortex

Next.js marketing site with Contentstack CMS integration.

## Structure

```
Vortex/
├── app/
│   ├── components/       # Content components (HomePage, Blog, etc.)
│   ├── site/             # Layout (Navbar, Footer)
│   ├── [page]/           # Dynamic routes (/about.html, /blog.html, etc.)
│   ├── _sitePages.tsx    # Static page content registry
│   ├── layout.tsx
│   ├── page.tsx          # Homepage
│   ├── not-found.tsx
│   └── styles.css        # Global styles
├── lib/
│   └── contentstack.ts   # Contentstack Delivery SDK + fetch helpers
├── public/
│   └── script.js        # Client-side (menu, dropdowns, filters)
├── scripts/
│   ├── contentstack-seed.mjs   # Seed Contentstack entries
│   └── generate-homepage.mjs   # Build-time homepage (Contentstack Launch)
├── CONTENTSTACK.md        # Contentstack setup
├── CONTENTSTACK_BUILD.md  # Build-time Contentstack Launch
└── CS Gaps/               # Integration guides
```

## Commands

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run contentstack:seed` — Create sample entries in Contentstack

## Documentation

- [CONTENTSTACK.md](CONTENTSTACK.md) — Contentstack setup and usage
- [CONTENTSTACK_BUILD.md](CONTENTSTACK_BUILD.md) — Build-time Contentstack Launch
- [CS Gaps/](CS%20Gaps/) — Contentstack integration guides
