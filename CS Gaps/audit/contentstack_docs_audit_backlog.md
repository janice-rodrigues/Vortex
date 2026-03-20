# Contentstack Docs Audit — Prioritized Backlog (User + AI Readability)

This backlog is derived from:
- sitemap-wide inventory (**1023 URLs**)
- automated structure checks (canonical/meta/H1, code blocks, task headings)
- known real-world integration gaps observed in Vortex (`CS Gaps/CONTENTSTACK_INTEGRATION_GAPS.md`)

## P0 (breaks discoverability / reliability)

- **Fix pages with missing or multiple H1** (accessibility + SEO + AI chunking).
  - H1 missing: **15** pages
  - H1 multiple: **2** pages
  - Examples (first 20):
    - https://www.contentstack.com/docs/developers/apis/analytics-api — Analytics API | Contentstack
    - https://www.contentstack.com/docs/developers/apis/automation-hub-management-api — Automate Management API | Documentation
    - https://www.contentstack.com/docs/developers/apis/brand-kit-management-api — Brand Kit Management API | Contentstack
    - https://www.contentstack.com/docs/developers/apis/content-delivery-api — Content Delivery API Docs | Contentstack
    - https://www.contentstack.com/docs/developers/apis/content-management-api — Content Management API Docs | Contentstack
    - https://www.contentstack.com/docs/developers/apis/generative-ai-api — Generative AI API | Documentation
    - https://www.contentstack.com/docs/developers/apis/graphql-content-delivery-api — GraphQL Content Delivery API for Developers | Contentstack
    - https://www.contentstack.com/docs/developers/apis/image-delivery-api — Image Delivery API Docs | APIs for image retrieval | Contentstack
    - https://www.contentstack.com/docs/developers/apis/knowledge-vault-api — Knowledge Vault API | Documentation
    - https://www.contentstack.com/docs/developers/apis/launch-api — Launch API | Contentstack
    - https://www.contentstack.com/docs/developers/apis/personalize-edge-api — Personalize Edge API | Contentstack
    - https://www.contentstack.com/docs/developers/apis/personalize-management-api — Personalize Management API | Contentstack
    - https://www.contentstack.com/docs/developers/apis/scim-api — SCIM API Docs | Contentstack
    - https://www.contentstack.com/docs/developers/create-releases/deploy-a-release
    - https://www.contentstack.com/docs/faqs — FAQs | Contentstack

- **Fix pages missing canonical and/or meta description** (canonicalization + search snippets).
  - Missing canonical: **2** pages
  - Missing meta description: **2** pages
  - Examples:
    - https://www.contentstack.com/docs/developers/create-releases/deploy-a-release
    - https://www.contentstack.com/docs/search

## P1 (biggest conversion wins for juniors)

- **Add a consistent “Troubleshooting” section to task docs** (error → cause → fix).
  - Currently missing on **1013 / 1023** pages
  - High-leverage candidates (developers task-like pages missing troubleshooting; first 25):
    - https://www.contentstack.com/docs/developers/automation-hub-connectors/contentstack-management-taxonomy-actions — Contentstack Management - Taxonomy Actions | Contentstack
    - https://www.contentstack.com/docs/developers/automation-hub-connectors/transform — Transform | Contentstack
    - https://www.contentstack.com/docs/developers/cli/apps-cli-plugin — Apps CLI Plugin | Contentstack
    - https://www.contentstack.com/docs/developers/cli/audit-plugin — Audit Plugin | Contentstack
    - https://www.contentstack.com/docs/developers/cli/bulk-operations-in-cli — Contentstack CLI Bulk | Contentstack
    - https://www.contentstack.com/docs/developers/cli/bulk-publish-and-unpublish-content — Bulk Publish and Unpublish Content | Contentstack Documentation
    - https://www.contentstack.com/docs/developers/cli/cli-for-launch — CLI for Launch | Contentstack
    - https://www.contentstack.com/docs/developers/cli/compare-and-merge-branches-using-the-cli — Compare and Merge Branches using the CLI | Contentstack
    - https://www.contentstack.com/docs/developers/cli/create-custom-cli-plugins — Create Custom CLI Plugins for Contentstack | Contentstack
    - https://www.contentstack.com/docs/developers/contentstack-regions/selecting-region-in-contentstack-starter-apps — Selecting Region in Contentstack Starter Apps
    - https://www.contentstack.com/docs/developers/create-content-types/json-schema-for-creating-a-content-type — How To Create JSON Schema for a Content Type | Contentstack
    - https://www.contentstack.com/docs/developers/developer-hub/app-manifest — Marketplace App Manifest | Contentstack
    - https://www.contentstack.com/docs/developers/how-to-guides/personalize-your-contentstack-powered-website-using-uniform-optimize — Personalize your website content using Uniform Optimize and Contentstack
    - https://www.contentstack.com/docs/developers/how-to-guides/setting-up-a-translation-system-using-contentstack-webhooks-aws-lambda-and-xtm-human-translation — Setting Up a Translation System | Contentstack
    - https://www.contentstack.com/docs/developers/how-to-guides/setting-up-an-email-management-system-with-contentstack-and-sendgrid — Setting up an Email Management System with Contentstack and SendGrid
    - https://www.contentstack.com/docs/developers/kickstarts/next — Kickstart Next.js | Contentstack
    - https://www.contentstack.com/docs/developers/marketplace-apps/cloudinary — Cloudinary App Installation Guide | Contentstack
    - https://www.contentstack.com/docs/developers/marketplace-apps/salesforce-commerce — Salesforce Commerce App Installation Guide | Contentstack
    - https://www.contentstack.com/docs/developers/marketplace-apps/xtm — XTM App Installation Guide | Contentstack
    - https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/ios/get-started-with-ios-sdk — Get Started with iOS SDK
    - https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/typescript/migrate-from-javascript-to-typescript — Migrate from JavaScript to TypeScript | Contentstack
    - https://www.contentstack.com/docs/developers/cli/migrate-content-between-stacks-using-the-cli — Migrate Content Between Stacks Using the CLI | Contentstack
    - https://www.contentstack.com/docs/developers/launch/upload-your-deployment-zip-file-to-launch — Upload Your Deployment Zip File to Launch | Contentstack
    - https://www.contentstack.com/docs/developers/sdks/contentstack-app-sdk/typescript/get-started-with-contentstack-app-sdk — Get Started with Contentstack App SDK | Contentstack
    - https://www.contentstack.com/docs/developers/create-content-types/reference-field-upgradation — Reference Field Upgradation | Contentstack
    - ... and 221 more

- **Promote a single “golden path” for Fetch → Render → Deploy** (don’t mix modes).
  - Provide a canonical decision page: **Client-side vs Server runtime vs Build-time**
  - Make it the top link from “Fetch Content”, Delivery API, and Launch quickstarts
  - Include “verify with curl first” + “what changes when you publish content”

- **Teach UID-vs-label and modular sections mapping early and repeatedly**.
  - Add a short UID primer with UI click-path screenshots
  - Add a canonical “Modular sections (sections[]) rendering pattern” doc (resolver + required fields + null handling)

- **Region/host selection should be a decision + verification, not just a table**.
  - Add “How to find your stack region” + “choose the correct CDN host”
  - Add a copy/paste `curl` that fails loudly when the host is wrong

## P2 (AI ingestion quality / maintenance)

- **Publish an `llms.txt` and `llms-full.txt` for the docs domain**.
  - Curate stable canonical URLs for: CDA auth, delivery tokens, regions endpoints, publish semantics, locales, Launch env vars
  - Include “preferred citations” and canonical curl snippets

- **Standardize page templates** (reduces drift; helps AI chunking).
  - Recommended sections: Prerequisites → Inputs → Steps → Expected output → Troubleshooting → Related links

- **Provide machine-readable “task manifests”** (optional).
  - e.g., frontmatter/JSON describing required env vars, API hosts, endpoints, headers, and sample requests

## Notes / Evidence sources

- Automated metrics: `CS Gaps/audit/contentstack_docs_metrics.csv`
- Top-fix-first list: `CS Gaps/audit/contentstack_docs_audit_top_issues.csv`
- Summary stats: `CS Gaps/audit/contentstack_docs_audit_summary.md`
- Observed real integration gaps: `CS Gaps/CONTENTSTACK_INTEGRATION_GAPS.md`
