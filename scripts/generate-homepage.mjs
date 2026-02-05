import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

function env(name, { required = true, fallback } = {}) {
  const v = process.env[name] ?? fallback;
  if (required && (!v || String(v).trim() === '')) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function truthy(v) {
  return String(v || '').trim().toLowerCase() === 'true' || String(v || '').trim() === '1';
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function csGet({ host, path, params, apiKey, deliveryToken }) {
  const url = new URL(`https://${host}${path}`);
  for (const [k, v] of Object.entries(params || {})) url.searchParams.set(k, String(v));

  const res = await fetch(url, {
    headers: {
      api_key: apiKey,
      access_token: deliveryToken
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Contentstack request failed (${res.status}): ${text || res.statusText}`);
  }
  return await res.json();
}

function replaceAll(template, vars) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, v);
  }
  return out;
}

async function main() {
  // Optional: local mock mode (no network, no tokens)
  // Provide a JSON file containing the homepage fields, e.g.:
  // { "hero_title": "...", "hero_subtitle": "...", "trusted_by_text": "..." }
  const mockFile = env('CONTENTSTACK_MOCK_FILE', { required: false });
  const debug = truthy(process.env.CONTENTSTACK_DEBUG);

  // Contentstack (private at build time) — only required when not using mock mode
  const host = env('CONTENTSTACK_CDN_HOST', { required: false, fallback: 'cdn.contentstack.io' });
  const apiKey = mockFile ? '' : env('CONTENTSTACK_API_KEY');
  const deliveryToken = mockFile ? '' : env('CONTENTSTACK_DELIVERY_TOKEN');
  const environment = mockFile ? '' : env('CONTENTSTACK_ENVIRONMENT');

  // Your homepage entry
  const contentTypeUid = env('CONTENTSTACK_HOMEPAGE_CONTENT_TYPE_UID', { required: false, fallback: 'homepage' });
  const entryUid = env('CONTENTSTACK_HOMEPAGE_ENTRY_UID', { required: false });

  // Field UIDs (adjust to match your Content Type)
  const heroTitleField = env('CONTENTSTACK_FIELD_HERO_TITLE', { required: false, fallback: 'hero_title' });
  const heroSubtitleField = env('CONTENTSTACK_FIELD_HERO_SUBTITLE', { required: false, fallback: 'hero_subtitle' });
  const trustedByField = env('CONTENTSTACK_FIELD_TRUSTED_BY_TEXT', { required: false, fallback: 'trusted_by_text' });

  const templatePath = env('HOMEPAGE_TEMPLATE', { required: false, fallback: 'index.template.html' });
  const outputPath = env('HOMEPAGE_OUTPUT', { required: false, fallback: 'index.html' });

  let entry;
  if (mockFile) {
    const raw = await readFile(mockFile, 'utf8');
    entry = JSON.parse(raw);
    if (debug) {
      console.log(`[debug] mode=mock file=${mockFile}`);
      console.log('[debug] mock keys:', Object.keys(entry || {}).sort());
    }
  } else {
    const query = entryUid ? JSON.stringify({ uid: entryUid }) : undefined;

    const json = await csGet({
      host,
      apiKey,
      deliveryToken,
      path: `/v3/content_types/${encodeURIComponent(contentTypeUid)}/entries`,
      params: {
        environment,
        include_count: 'true',
        limit: '1',
        ...(query ? { query } : {})
      }
    });

    if (debug) {
      console.log(`[debug] mode=contentstack host=${host} env=${environment} contentType=${contentTypeUid} entryUid=${entryUid || '(first)'} `);
      console.log('[debug] response keys:', Object.keys(json || {}).sort());
      console.log('[debug] entries count:', (json && json.entries && json.entries.length) ? json.entries.length : 0);
    }

    entry = (json && json.entries && json.entries[0]) ? json.entries[0] : null;
    if (!entry) {
      throw new Error(`No entry found for content_type='${contentTypeUid}'${entryUid ? ` uid='${entryUid}'` : ''}.`);
    }

    if (debug) {
      console.log('[debug] entry keys:', Object.keys(entry || {}).sort());
    }
  }

  const heroTitle = entry[heroTitleField] ?? 'Accelerate your team’s workflow';
  const heroSubtitle = entry[heroSubtitleField] ?? 'Modern tools for seamless collaboration.';
  const trustedByText = entry[trustedByField] ?? 'Trusted by teams worldwide';

  if (debug) {
    console.log('[debug] field mapping:');
    console.log(`  ${heroTitleField} -> HERO_TITLE = ${JSON.stringify(heroTitle)}`);
    console.log(`  ${heroSubtitleField} -> HERO_SUBTITLE = ${JSON.stringify(heroSubtitle)}`);
    console.log(`  ${trustedByField} -> TRUSTED_BY_TEXT = ${JSON.stringify(trustedByText)}`);
  }

  const template = await readFile(templatePath, 'utf8');
  const rendered = replaceAll(template, {
    HERO_TITLE: escapeHtml(heroTitle),
    HERO_SUBTITLE: escapeHtml(heroSubtitle),
    TRUSTED_BY_TEXT: escapeHtml(trustedByText)
  });

  await mkdir(dirname(outputPath), { recursive: true }).catch(() => {});
  await writeFile(outputPath, rendered, 'utf8');

  console.log(`Generated ${outputPath} from ${templatePath} using ${mockFile ? `mock file ${mockFile}` : 'Contentstack entry'}.`);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});

