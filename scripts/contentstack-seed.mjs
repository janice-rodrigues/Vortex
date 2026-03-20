#!/usr/bin/env node
/**
 * Contentstack seed script - creates entries in homepage, blog_post, author_details
 * and optionally creates the "page" content type with entries for about, features, pricing.
 *
 * Requires: CONTENTSTACK_MANAGEMENT_TOKEN and CONTENTSTACK_API_KEY in .env
 * Run: node scripts/contentstack-seed.mjs
 */

import contentstack from '@contentstack/management';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadEnv() {
  const envPath = resolve(root, '.env.local');
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) {
        const key = m[1].trim();
        const val = m[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

loadEnv();

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_API_KEY;
const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;

if (!apiKey || !managementToken) {
  console.error('Missing CONTENTSTACK_MANAGEMENT_TOKEN or NEXT_PUBLIC_CONTENTSTACK_API_KEY. Add to .env.local');
  process.exit(1);
}

const client = contentstack.client();
const stack = client.stack({ api_key: apiKey, management_token: managementToken });

async function createAuthorEntries() {
  const authors = [
    { title: 'Jordan Avery', name: 'Jordan Avery', role: 'Product Manager', bio: 'Product leader focused on workflow tools.' },
    { title: 'Sam Chen', name: 'Sam Chen', role: 'Engineering Lead', bio: 'Builds scalable systems for teams.' },
  ];
  const created = [];
  for (const a of authors) {
    try {
      const entry = await stack.contentType('author_details').entry().create({ entry: a });
      created.push(entry);
      console.log('Created author:', a.title);
    } catch (e) {
      console.warn('Author create failed (may exist):', e.message);
    }
  }
  return created;
}

async function createBlogPostEntries(authorUids) {
  const authorUid = authorUids[0]?.uid;
  const posts = [
    {
      title: 'Recent feature releases',
      url: '/blog-feature-releases.html',
      subtitle: "What's new this month: workflow automation, dashboards, and faster collaboration.",
      category: 'Product',
      date: '2026-01-15',
      read_time: 5,
      content: '<p>Define routing and reminders with clear rules so teams trust what\'s happening in the background.</p><h3>1) Automations that stay readable</h3><p>Smarter triggers, clean handoffs, less manual follow-up.</p><h3>2) More flexible dashboards</h3><p>Switch between views and share dashboards that match how stakeholders consume progress.</p><h3>3) Collaboration improvements</h3><p>Faster activity updates and cleaner conversations.</p>',
      author: authorUid ? [{ uid: authorUid, _content_type_uid: 'author_details' }] : undefined,
    },
    {
      title: 'Onboarding best practices',
      url: '/blog-onboarding-best-practices.html',
      subtitle: 'Get your org productive quickly with roles, defaults, and a clean first sprint.',
      category: 'Guides',
      date: '2025-12-10',
      read_time: 6,
      content: '<p>Start with one team and one workflow template, then expand once it\'s working.</p><h3>Week 1: Setup</h3><ul><li>Create spaces for teams and projects</li><li>Define roles and permissions</li><li>Pick 1–2 templates for repeatable tasks</li></ul><h3>Week 2: Make it stick</h3><p>Add simple automations and create a dashboard for leaders.</p>',
      author: authorUid ? [{ uid: authorUid, _content_type_uid: 'author_details' }] : undefined,
    },
    {
      title: "Industry trends: what's next in SaaS",
      url: '/blog-saas-trends.html',
      subtitle: 'From AI copilots to secure-by-default workflows—how teams are evolving delivery.',
      category: 'Insights',
      date: '2026-01-20',
      read_time: 9,
      content: '<p>Teams are optimizing for clarity and speed—without sacrificing governance.</p><h3>1) AI copilots</h3><p>Assistive AI is useful when it supports clear processes.</p><h3>2) Secure-by-default systems</h3><p>Access control and auditability become table stakes.</p>',
      author: authorUid ? [{ uid: authorUid, _content_type_uid: 'author_details' }] : undefined,
    },
  ];
  for (const p of posts) {
    try {
      const entry = { title: p.title, url: p.url, ...p };
      delete entry.author;
      if (p.author) entry.author = p.author;
      await stack.contentType('blog_post').entry().create({ entry });
      console.log('Created blog post:', p.title);
    } catch (e) {
      console.warn('Blog post create failed:', e.message);
    }
  }
}

async function createHomepageEntry() {
  const entry = {
    title: 'Vortex Homepage',
    url: '/',
    hero_title: "Accelerate your team's workflow",
    hero_subtitle: 'Modern tools for seamless collaboration.',
    hero_cta_primary: 'Try free',
    hero_cta_secondary: 'Explore features',
    hero_cta_primary_link: '/pricing.html',
    hero_cta_secondary_link: '/features.html',
    trusted_by_text: 'Trusted by teams worldwide',
    features_title: 'Work smarter, move faster',
    testimonial_quote: 'Vortex streamlines our processes, enabling effortless teamwork and faster project delivery. Its clean interface and powerful tools keep our team focused and efficient.',
    testimonial_author_name: 'Jordan Avery',
    testimonial_author_role: 'Product Manager',
    testimonial_cta: 'Try now',
    updates_title: 'Fresh insights. Real impact.',
    updates_subtitle: 'Browse product updates, guides, and industry news—all in one place.',
  };
  try {
    await stack.contentType('homepage').entry().create({ entry });
    console.log('Created homepage entry');
  } catch (e) {
    if (e.errors?.uid?.includes('single entry')) {
      console.log('Homepage entry already exists (singleton).');
    } else {
      console.warn('Homepage create failed (field names may differ):', e.message);
    }
  }
}

async function main() {
  console.log('Seeding Contentstack...\n');
  const authors = await createAuthorEntries();
  await createBlogPostEntries(authors);
  await createHomepageEntry();
  console.log('\nDone. Publish entries in Contentstack UI to see them on the site.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
