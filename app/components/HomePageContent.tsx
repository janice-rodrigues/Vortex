import { getHomepage } from '@/lib/contentstack';
import { HomePage } from '../_sitePages';

type FeatureItem = { icon?: string; name?: string; title?: string; description?: string };

const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: '⚡', title: 'Automated workflows', description: 'Reduce manual steps with intelligent automation for daily tasks.' },
  { icon: '👥', title: 'Instant collaboration', description: 'Collaborate in real time with live updates and shared spaces.' },
  { icon: '📊', title: 'Flexible dashboards', description: 'Customize your view to match your workflow and priorities.' },
  { icon: '📈', title: 'Data-driven insights', description: 'Access detailed analytics to guide better business decisions.' },
  { icon: '🔒', title: 'Cloud security', description: 'Store and access data securely with robust cloud protection.' },
  { icon: '🔗', title: 'Effortless integrations', description: 'Connect your essential tools for a seamless workflow.' },
];

const DEFAULT_UPDATES = [
  { category: 'Product', title: 'Recent feature releases', description: "What's new this month: workflow automation, dashboards, and faster collaboration.", date: 'Jan 2026', read_time: '5 min read', url: '/blog-feature-releases.html' },
  { category: 'Guides', title: 'Onboarding best practices', description: 'Get your org productive quickly with roles, defaults, and a clean first sprint.', date: 'Dec 2025', read_time: '6 min read', url: '/blog-onboarding-best-practices.html' },
  { category: 'Insights', title: "Industry trends: what's next in SaaS", description: 'From AI copilots to secure-by-default workflows—how teams are evolving delivery.', date: 'Jan 2026', read_time: '9 min read', url: '/blog-saas-trends.html' },
];

export async function HomePageContent() {
  const data = await getHomepage();

  if (!data) {
    return <HomePage />;
  }

  const heroTitle = data.hero_title ?? "Accelerate your team's workflow";
  const heroSubtitle = data.hero_subtitle ?? 'Modern tools for seamless collaboration.';
  const heroCtaPrimary = data.hero_cta_primary ?? 'Try free';
  const heroCtaSecondary = data.hero_cta_secondary ?? 'Explore features';
  const heroCtaPrimaryLink = data.hero_cta_primary_link ?? '/pricing.html';
  const heroCtaSecondaryLink = data.hero_cta_secondary_link ?? '/features.html';
  const trustedByText = data.trusted_by_text ?? 'Trusted by teams worldwide';
  const featuresTitle = data.features_title ?? 'Work smarter, move faster';
  const features: FeatureItem[] = data.features?.length ? (data.features as FeatureItem[]) : DEFAULT_FEATURES;
  const testimonialQuote = data.testimonial_quote ?? 'Vortex streamlines our processes, enabling effortless teamwork and faster project delivery.';
  const testimonialName = data.testimonial_author_name ?? 'Jordan Avery';
  const testimonialRole = data.testimonial_author_role ?? 'Product Manager';
  const testimonialCta = data.testimonial_cta ?? 'Try now';
  const updatesTitle = data.updates_title ?? 'Fresh insights. Real impact.';
  const updatesSubtitle = data.updates_subtitle ?? 'Browse product updates, guides, and industry news—all in one place.';
  const updates = data.updates?.length ? data.updates : DEFAULT_UPDATES;

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">{heroSubtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={heroCtaPrimaryLink}>
                {heroCtaPrimary}
              </a>
              <a className="btn btn-outline" href={heroCtaSecondaryLink}>
                {heroCtaSecondary}
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">
              <div className="workspace-visual" />
            </div>
          </div>
        </div>
        <div className="trusted-by">
          <div className="container">
            <p>{trustedByText}</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>{featuresTitle}</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon ?? '•'}</div>
                <h3>{f.name ?? f.title ?? ''}</h3>
                <p>{f.description ?? ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial">
        <div className="container">
          <div className="testimonial-content">
            <div className="testimonial-image">
              <div className="testimonial-placeholder" />
            </div>
            <div className="testimonial-text">
              <blockquote>&quot;{testimonialQuote}&quot;</blockquote>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>{testimonialName}</strong>
                  <span>{testimonialRole}</span>
                </div>
              </div>
              <a className="btn btn-primary" href="/pricing.html">
                {testimonialCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="updates">
        <div className="container">
          <div className="section-header">
            <h2>{updatesTitle}</h2>
            <p>{updatesSubtitle}</p>
          </div>
          <div className="filter-tabs">
            <button className="filter-btn active" data-filter="all">
              All
            </button>
            <button className="filter-btn" data-filter="product">
              Product
            </button>
            <button className="filter-btn" data-filter="guides">
              Guides
            </button>
            <button className="filter-btn" data-filter="insights">
              Insights
            </button>
          </div>
          <div className="updates-grid">
            {updates.map((u, i) => (
              <a
                key={i}
                className={`update-card ${i === 0 ? 'featured' : ''}`}
                data-category={(u.category ?? '').toLowerCase()}
                href={u.url ?? '#'}
                aria-label={`Read: ${u.title ?? ''}`}
              >
                <div className="update-image">
                  <img
                    loading="lazy"
                    alt={`${u.title ?? ''} cover`}
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%232563eb'/><stop offset='1' stop-color='%2310b981'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/></svg>"
                  />
                </div>
                <div className="update-content">
                  <span className="update-category">{u.category ?? ''}</span>
                  <h3>{u.title ?? ''}</h3>
                  <p>{u.description ?? ''}</p>
                  <div className="update-meta">
                    <span>{u.date ?? ''}</span>
                    <span className="dot">•</span>
                    <span>{u.read_time ?? ''}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
