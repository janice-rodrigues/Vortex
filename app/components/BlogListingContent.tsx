import { getBlogPosts } from '@/lib/contentstack';
import Link from 'next/link';

export async function BlogListingContent() {
  const posts = await getBlogPosts();

  if (!posts.length) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Fresh insights. Real impact.</h1>
          <p className="page-subtitle">
            Product updates, guides, and industry news—all in one place.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>
            No blog posts yet. Add entries in Contentstack and publish to see them here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/index.html">Home</Link>
            <span>›</span>
            <span>Blog</span>
          </div>
          <h1 className="page-title">Fresh insights. Real impact.</h1>
          <p className="page-subtitle">
            Product updates, guides, and industry news—all in one place.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/guides.html">
              Browse guides
            </Link>
            <Link className="btn btn-outline" href="/features.html">
              Features
            </Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <div className="updates-grid" style={{ marginTop: 24 }}>
            {posts.map((post, i) => (
              <Link
                key={post.uid}
                className={`update-card ${i === 0 ? 'featured' : ''}`}
                data-category={(post.category ?? '').toLowerCase()}
                href={post.url ?? '#'}
                aria-label={`Read: ${post.title ?? ''}`}
              >
                <div className="update-image">
                  <img
                    loading="lazy"
                    alt={`${post.title ?? ''} cover`}
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%232563eb'/><stop offset='1' stop-color='%2310b981'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/></svg>"
                  />
                </div>
                <div className="update-content">
                  <span className="update-category">{post.category ?? ''}</span>
                  <h3>{post.title ?? ''}</h3>
                  <p>{post.subtitle ?? ''}</p>
                  <div className="update-meta">
                    <span>{post.date ?? ''}</span>
                    <span className="dot">•</span>
                    <span>{typeof post.read_time === 'number' ? `${post.read_time} min read` : (post.read_time ?? '')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
