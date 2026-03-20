# Deploy Vortex to Contentstack Launch

## Prerequisites

- Contentstack account with Launch access (Org Admin/Owner)
- GitHub account
- Vortex code pushed to a GitHub repository

## Step 1: Push to GitHub

If you haven't already, create a GitHub repo and push your Vortex project:

```bash
cd Vortex
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vortex.git
git push -u origin main
```

**Important:** Never commit `.env.local` — it's in `.gitignore`. You'll add secrets in Launch.

## Step 2: Create Launch Project

1. Log in to [Contentstack](https://app.contentstack.com)
2. Go to **Launch** (from the app switcher or your org)
3. Click **+ New Project**
4. Select **Import from a Git Repository**
5. Click **GitHub** and authorize Contentstack
6. In the Create New Project modal:
   - **Repository:** Select your Vortex repo
   - **Git Branch:** `main` (or your default branch)
   - **Project Name:** Vortex (or your choice)
   - **Environment Name:** Production (or `main` to match your Contentstack environment)

## Step 3: Environment Variables

Add these in **Environment Variables** (Launch will use them at build time):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | Your stack API key (e.g. `bltaddf972fe290f55d`) |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | Delivery token for the production environment |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | Environment name (e.g. `main` or `production`) |

**Optional:** If you use a different Contentstack region, add:
- `NEXT_PUBLIC_CONTENTSTACK_REGION` (e.g. `eu` for EU)

## Step 4: Build Settings

Launch auto-detects Next.js. Verify:

- **Build Command:** `npm run build` (or `next build`)
- **Output Directory:** `.next` (default for Next.js)
- **Install Command:** `npm install`

No changes needed if auto-detected.

## Step 5: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. When done, your site URL appears in the **Domains** section
4. Click the preview icon next to the URL to open your site

## Your Website URL

After deployment, Launch provides a URL such as:

- `https://vortex-<env>.launch.contentstack.com`
- Or a custom domain if you configure one in Launch

The exact URL is shown in the Launch project's **Domains** section after each successful deploy.

## Redeploying

- **Redeploy:** Click **Redeploy** in Launch to rebuild from the latest commit
- **Auto-deploy:** Connect a webhook so pushes to GitHub trigger new deployments

## Troubleshooting

- **Build fails:** Check the **Logs** tab for errors. Common issues: missing env vars, Node version mismatch
- **Blank page / 404:** Ensure `NEXT_PUBLIC_*` env vars are set and you've published content in Contentstack
- **Content not updating:** Publish in Contentstack, then trigger a **Redeploy** in Launch to rebuild with fresh content
