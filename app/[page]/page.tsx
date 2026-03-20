import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSitePageKey, SITE_PAGES } from '../_sitePages';
import { BlogListingContent } from '../components/BlogListingContent';
import { BlogPostContent } from '../components/BlogPostContent';
import { getBlogPostByUrl } from '@/lib/contentstack';

const BLOG_POST_KEYS = [
  'blog-feature-releases.html',
  'blog-onboarding-best-practices.html',
  'blog-saas-trends.html',
  'blog-security-update-overview.html',
  'blog-weekly-roundup.html',
  'blog-workspace-customization.html',
] as const;

function isBlogPostKey(page: string): page is (typeof BLOG_POST_KEYS)[number] {
  return BLOG_POST_KEYS.includes(page as (typeof BLOG_POST_KEYS)[number]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  if (!isSitePageKey(page)) return {};
  if (page === 'blog.html') return { title: 'Vortex — Blog' };
  if (isBlogPostKey(page)) {
    const post = await getBlogPostByUrl(`/${page}`);
    if (post?.title) return { title: `Vortex Blog — ${post.title}` };
  }
  return { title: SITE_PAGES[page].title };
}

export default async function HtmlPage({
  params
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!isSitePageKey(page)) notFound();

  if (page === 'blog.html') {
    return <BlogListingContent />;
  }

  if (isBlogPostKey(page)) {
    return (
      <BlogPostContent
        url={`/${page}`}
        fallbackKey={page}
      />
    );
  }

  return SITE_PAGES[page].render();
}

