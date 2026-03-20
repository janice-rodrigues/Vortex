import { getBlogPostByUrl } from '@/lib/contentstack';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_PAGES } from '../_sitePages';

type Props = {
  url: string;
  fallbackKey?: keyof typeof SITE_PAGES;
};

export async function BlogPostContent({ url, fallbackKey }: Props) {
  const post = await getBlogPostByUrl(url);

  if (!post && fallbackKey) {
    const def = SITE_PAGES[fallbackKey];
    if (def) return <>{def.render()}</>;
  }

  if (!post) {
    notFound();
  }

  const author = Array.isArray(post.author) ? post.author[0] : post.author;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div>
            <div className="breadcrumbs">
            <Link href="/index.html">Home</Link>
            <span>›</span>
            <Link href="/blog.html">Blog</Link>
            <span>›</span>
            <span>{post.category ?? ''}</span>
          </div>
          <h1 className="page-title">{post.title ?? ''}</h1>
          <p className="page-subtitle">{post.subtitle ?? ''}</p>
            <div className="update-meta">
              <span>{post.date ?? ''}</span>
              <span className="dot">•</span>
              <span>{typeof post.read_time === 'number' ? `${post.read_time} min read` : (post.read_time ?? '')}</span>
            <span className="dot">•</span>
            <span>{post.category ?? ''}</span>
          </div>
          {author && (
            <div style={{ marginTop: 12 }}>
              <strong>{author.name ?? ''}</strong>
              {author.role && <span style={{ color: 'var(--text-secondary)', marginLeft: 8 }}>{author.role}</span>}
            </div>
          )}
          </div>
          <aside className="hero-aside">
            <Link className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
              Back to Blog
            </Link>
          </aside>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <div className="two-col">
            <article className="card">
              {post.content ? (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{ maxWidth: '100%' }}
                />
              ) : (
                <p>No content.</p>
              )}
            </article>
            <aside className="card">
              <span className="tag">Related</span>
              <h3>Read next</h3>
              <ul className="checklist">
                <li><Link href="/blog-feature-releases.html">Recent feature releases</Link></li>
                <li><Link href="/blog-saas-trends.html">Industry trends: what&apos;s next in SaaS</Link></li>
                <li><Link href="/blog-weekly-roundup.html">Weekly update roundup</Link></li>
              </ul>
              <Link className="btn btn-outline" href="/blog.html" style={{ marginTop: 14 }}>
                Back to Blog
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
