// Minimal client-side Contentstack fetch for homepage only.
// Requires window.CONTENTSTACK_RUNTIME from contentstack.runtime.config.js

async function csFetchJson(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Contentstack request failed (${res.status}): ${text || res.statusText}`);
  }
  return await res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value === undefined || value === null) return;
  if (String(value).trim() === '') return;
  el.textContent = String(value);
}


function setLink(id, { label, href, newTab } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (label && String(label).trim() !== '') el.textContent = String(label);
  if (href && String(href).trim() !== '') el.setAttribute('href', String(href));
  if (newTab === true) {
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  } else if (newTab === false) {
    el.removeAttribute('target');
    el.removeAttribute('rel');
  }
}

function getDeep(obj, path) {
  if (!obj || !path) return undefined;
  const parts = String(path).split('.').filter(Boolean);
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function getSection(entry, key) {
  const sections = entry && Array.isArray(entry.sections) ? entry.sections : [];
  for (const item of sections) {
    if (item && typeof item === 'object' && key in item) return item[key];
  }
  return undefined;
}

function setMetaTag(name, content) {
  if (!content || String(content).trim() === '') return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', String(content));
}

function setOgTag(property, content) {
  if (!content || String(content).trim() === '') return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', String(content));
}

function renderFeatureGrid(features) {
  const grid = document.getElementById('features-grid');
  if (!grid || !Array.isArray(features) || features.length === 0) return;

  grid.innerHTML = '';
  for (const f of features) {
    const card = document.createElement('div');
    card.className = 'feature-card';

    const icon = document.createElement('div');
    icon.className = 'feature-icon';
    icon.textContent = '✨';

    const title = document.createElement('h3');
    title.textContent = f?.feature_title || '';

    const desc = document.createElement('p');
    desc.textContent = f?.feature_description || '';

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    grid.appendChild(card);
  }
}

async function hydrateHomepageFromContentstack() {
  const cfg = window.CONTENTSTACK_RUNTIME;
  if (!cfg || !cfg.enabled) return;

  const hp = cfg.homepage;
  if (!hp || !hp.contentTypeUid || !hp.entryUid) {
    console.warn('[Contentstack] Missing homepage.contentTypeUid or homepage.entryUid');
    return;
  }

  const url =
    `https://${cfg.cdnHost}` +
    `/v3/content_types/${encodeURIComponent(hp.contentTypeUid)}` +
    `/entries/${encodeURIComponent(hp.entryUid)}` +
    `?environment=${encodeURIComponent(cfg.environment)}`;

  const headers = {
    api_key: cfg.apiKey,
    access_token: cfg.deliveryToken
  };

  try {
    const json = await csFetchJson(url, headers);
    const entry = json && json.entry ? json.entry : null;
    if (!entry) throw new Error('No "entry" in response');

    // SEO (optional)
    const seo = entry.seo || {};
    if (seo.meta_title) document.title = String(seo.meta_title);
    setMetaTag('description', seo.meta_description);
    setOgTag('og:title', seo.open_graph_title || seo.meta_title);
    setOgTag('og:description', seo.open_graph_description || seo.meta_description);

    // Sections
    const hero = getSection(entry, 'hero_section');
    const featureGrid = getSection(entry, 'feature_grid');
    const testimonial = getSection(entry, 'testimonial_section');
    const blogHighlights = getSection(entry, 'blog_highlights_section');

    // Hero
    setText('hero-title', hero?.headline);
    setText('hero-subtitle', hero?.description || hero?.sub_text);
    const primary = hero?.cta_s?.primary_action?.action_link;
    const secondary = hero?.cta_s?.secondary_action?.action_link;
    setLink('hero-cta-primary', {
      label: primary?.link_label,
      href: primary?.destination_url,
      newTab: primary?.open_in_new_tab
    });
    setLink('hero-cta-secondary', {
      label: secondary?.link_label,
      href: secondary?.destination_url,
      newTab: secondary?.open_in_new_tab
    });

    // Features
    setText('features-title', featureGrid?.section_title);
    renderFeatureGrid(featureGrid?.features);

    // Testimonial
    setText('testimonial-quote', testimonial?.quote);
    setText('testimonial-name', testimonial?.person_name);
    setText('testimonial-role', testimonial?.person_role);
    const tPrimary = testimonial?.cta?.primary_action?.action_link;
    setLink('testimonial-cta', {
      label: tPrimary?.link_label,
      href: tPrimary?.destination_url,
      newTab: tPrimary?.open_in_new_tab
    });

    // Blog highlights header (maps to the existing "Fresh insights" section)
    setText('updates-title', blogHighlights?.section_title);
    setText('updates-subtitle', blogHighlights?.section_subtitle);
  } catch (err) {
    console.warn('[Contentstack] Homepage hydration failed:', err?.message || err);
    // Keep existing static text as fallback.
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hydrateHomepageFromContentstack);
} else {
  hydrateHomepageFromContentstack();
}

