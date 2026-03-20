import contentstack, { QueryOperation } from '@contentstack/delivery-sdk';

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'main';

const hasConfig = Boolean(apiKey && deliveryToken);
if (!hasConfig) {
  console.warn(
    'Contentstack: Missing API key or delivery token. Add NEXT_PUBLIC_CONTENTSTACK_API_KEY and NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN to .env.local'
  );
}

export const stack = hasConfig
  ? contentstack.stack({
      apiKey: apiKey!,
      deliveryToken: deliveryToken!,
      environment,
    })
  : null;

export type HomepageEntry = {
  title?: string;
  url?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string;
  hero_cta_secondary?: string;
  hero_cta_primary_link?: string;
  hero_cta_secondary_link?: string;
  trusted_by_text?: string;
  features_title?: string;
  features?: Array<{
    name?: string;
    title?: string;
    icon?: string;
    description?: string;
  }>;
  testimonial_quote?: string;
  testimonial_author_name?: string;
  testimonial_author_role?: string;
  testimonial_cta?: string;
  updates_title?: string;
  updates_subtitle?: string;
  updates?: Array<{
    category?: string;
    title?: string;
    description?: string;
    date?: string;
    read_time?: string;
    url?: string;
  }>;
};

export type BlogPostEntry = {
  uid: string;
  title?: string;
  url?: string;
  subtitle?: string;
  category?: string;
  date?: string;
  read_time?: string | number;
  content?: string;
  author?: Array<{
    name?: string;
    role?: string;
  }>;
};

export type AuthorEntry = {
  uid: string;
  name?: string;
  role?: string;
  bio?: string;
};

export type PageEntry = {
  uid: string;
  title?: string;
  url?: string;
  body?: string;
  page_type?: string;
};

export async function getHomepage(): Promise<HomepageEntry | null> {
  if (!stack) return null;
  try {
    const result = await stack.contentType('homepage').entry().query().find();
    const entries = result.entries as HomepageEntry[];
    return entries?.[0] ?? null;
  } catch (err) {
    console.error('Contentstack getHomepage:', err);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPostEntry[]> {
  if (!stack) return [];
  try {
    const result = await stack
      .contentType('blog_post')
      .entry()
      .query()
      .orderByDescending('date')
      .find();
    return (result.entries ?? []) as BlogPostEntry[];
  } catch (err) {
    console.error('Contentstack getBlogPosts:', err);
    return [];
  }
}

export async function getBlogPostByUrl(url: string): Promise<BlogPostEntry | null> {
  if (!stack) return null;
  try {
    const result = await stack
      .contentType('blog_post')
      .entry()
      .includeReference('author')
      .query()
      .where('url', QueryOperation.EQUALS, url)
      .find();
    const entries = result.entries as BlogPostEntry[];
    return entries?.[0] ?? null;
  } catch (err) {
    console.error('Contentstack getBlogPostByUrl:', err);
    return null;
  }
}

export async function getPageByUrl(url: string): Promise<PageEntry | null> {
  if (!stack) return null;
  try {
    const result = await stack
      .contentType('page')
      .entry()
      .query()
      .where('url', QueryOperation.EQUALS, url)
      .find();
    const entries = result.entries as PageEntry[];
    return entries?.[0] ?? null;
  } catch (err) {
    console.error('Contentstack getPageByUrl:', err);
    return null;
  }
}
