// Client-side Contentstack config (FASTEST approach)
// NOTE: This exposes your Delivery Token in the browser. Use a read-only token and only for public content.
window.CONTENTSTACK_RUNTIME = {
  enabled: true, // set true after filling values

  // Region host (default is NA). Examples:
  // - NA: cdn.contentstack.io
  // - EU: cdn-eu.contentstack.com
  // - AZURE NA: azure-na-cdn.contentstack.com
  // - AZURE EU: azure-eu-cdn.contentstack.com
  // IMPORTANT: for Content Delivery APIs from the browser, use a CDN host (e.g. cdn.contentstack.io),
  // not the management host (api.contentstack.io).
  cdnHost: 'cdn.contentstack.io',

  apiKey: 'bltaddf972fe290f55d',
  deliveryToken: 'cs029e0fb8a9b06bd55455d152',
  environment: 'staging',

  // Homepage entry to fetch
  homepage: {
    contentTypeUid: 'homepage',
    entryUid: 'bltebf6f01d62603408',

    // Field UIDs (edit to match your Content Type)
    fields: {
      heroTitle: 'hero_section.headline',
      heroSubtitle: 'hero_section.description',
      // Optional: if you have a field for this, set it here. Otherwise it will keep the static fallback.
      // Example: 'hero_section.sub_text'
      trustedByText: ''
    }
  }
};

