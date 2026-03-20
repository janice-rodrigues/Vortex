# Contentstack Integration

Vortex fetches content from Contentstack for the homepage, blog listing, and blog posts.

## Setup

### 1. Create a Delivery Token

The app needs a **Delivery Token** to fetch published content (different from the Management Token used for the seed script).

1. In Contentstack: **Settings** → **Tokens** → **Delivery Tokens**
2. Create a new token (e.g. "Vortex Web")
3. Assign it to your environment (e.g. `main`)
4. Copy the token value

### 2. Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_CONTENTSTACK_API_KEY=bltaddf972fe290f55d
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=<your-delivery-token>
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=main
```

### 3. Seed Entries

Run the seed script to create sample entries in your existing content types:

```bash
npm run contentstack:seed
```

This creates:
- **author_details**: 2 authors (Jordan Avery, Sam Chen)
- **blog_post**: 3 blog posts
- **homepage**: 1 homepage entry

### 4. Publish

Entries must be **published** in Contentstack to appear on the site. After seeding:
1. Go to each content type in Contentstack
2. Open the created entries
3. Click **Publish** and select your environment

## Content Models

You already have: `homepage`, `blog_post`, `author_details`.

### Recommended field UIDs

**homepage**
- `title`, `url`
- `hero_title`, `hero_subtitle`, `hero_cta_primary`, `hero_cta_secondary`, `hero_cta_primary_link`, `hero_cta_secondary_link`
- `trusted_by_text`
- `features_title`, `features` (modular block: `icon`, `name`, `description`)
- `testimonial_quote`, `testimonial_author_name`, `testimonial_author_role`, `testimonial_cta`
- `updates_title`, `updates_subtitle`, `updates` (modular block: `category`, `title`, `description`, `date`, `read_time`, `url`)

**blog_post**
- `title`, `url`, `subtitle`, `category`, `date`, `read_time`, `content`
- `author` (reference to `author_details`)

**author_details**
- `title`, `name`, `role`, `bio`

If your field UIDs differ, update `lib/contentstack.ts` and the seed script accordingly.
