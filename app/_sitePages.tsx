import type { ReactNode } from 'react';

export type SitePageKey =
  | 'index.html'
  | 'about.html'
  | 'api.html'
  | 'blog-feature-releases.html'
  | 'blog-onboarding-best-practices.html'
  | 'blog-saas-trends.html'
  | 'blog-security-update-overview.html'
  | 'blog-weekly-roundup.html'
  | 'blog-workspace-customization.html'
  | 'blog.html'
  | 'careers.html'
  | 'community.html'
  | 'compliance.html'
  | 'contact.html'
  | 'cookies.html'
  | 'docs.html'
  | 'enterprise.html'
  | 'faq.html'
  | 'features.html'
  | 'forum.html'
  | 'guides.html'
  | 'help.html'
  | 'integrations.html'
  | 'overview.html'
  | 'press.html'
  | 'pricing.html'
  | 'privacy.html'
  | 'security.html'
  | 'startups.html'
  | 'status.html'
  | 'support.html'
  | 'teams.html'
  | 'terms.html';

export const SITE_PAGE_KEYS: SitePageKey[] = [
  'index.html',
  'about.html',
  'api.html',
  'blog-feature-releases.html',
  'blog-onboarding-best-practices.html',
  'blog-saas-trends.html',
  'blog-security-update-overview.html',
  'blog-weekly-roundup.html',
  'blog-workspace-customization.html',
  'blog.html',
  'careers.html',
  'community.html',
  'compliance.html',
  'contact.html',
  'cookies.html',
  'docs.html',
  'enterprise.html',
  'faq.html',
  'features.html',
  'forum.html',
  'guides.html',
  'help.html',
  'integrations.html',
  'overview.html',
  'press.html',
  'pricing.html',
  'privacy.html',
  'security.html',
  'startups.html',
  'status.html',
  'support.html',
  'teams.html',
  'terms.html'
];

type PageDef = {
  title: string;
  render: () => ReactNode;
};

export function isSitePageKey(value: string): value is SitePageKey {
  return SITE_PAGE_KEYS.includes(value as SitePageKey);
}

// ─── Page registry: static fallback content for each route ───────────────────
// Order: index, company, product, blog, support, legal, api
export const SITE_PAGES: Record<SitePageKey, PageDef> = {
  'index.html': {
    title: "Vortex - Accelerate your team's workflow",
    render: () => <HomePage />
  },
  'about.html': {
    title: 'Vortex — About',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Company</span>
                <span>›</span>
                <span>About</span>
              </div>
              <h1 className="page-title">Built for modern teams</h1>
              <p className="page-subtitle">
                Vortex is a workflow platform designed to help teams collaborate, automate
                routine work, and ship outcomes with confidence.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Try free
                </a>
                <a className="btn btn-outline" href="/careers.html">
                  Careers
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Our focus</h4>
              <p>
                Speed, clarity, and a calm experience—so work feels lightweight even at
                scale.
              </p>
              <span className="tag">Product-first</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div>
                <span className="tag">Mission</span>
                <h2 style={{ fontSize: 34, letterSpacing: '-1px', marginBottom: 12 }}>
                  Make work move forward
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                  Teams waste time on manual handoffs, unclear ownership, and scattered
                  tools. Vortex brings structure, automation, and real-time collaboration
                  into a single, intuitive system.
                </p>
                <ul className="checklist">
                  <li>Clear ownership and accountability</li>
                  <li>Repeatable processes through templates</li>
                  <li>Automation to reduce busywork</li>
                  <li>Dashboards for visibility and outcomes</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">Values</span>
                <h3>How we build</h3>
                <p>Principles that shape the product and the company.</p>
                <ul className="checklist">
                  <li>Simple by default, powerful when needed</li>
                  <li>Secure and reliable for every team</li>
                  <li>Designed for collaboration</li>
                  <li>Obsessed with speed and clarity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page section-gray">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 34 }}>Want to build with us?</h2>
              <p style={{ fontSize: 16 }}>
                We’re hiring people who care about great UX and pragmatic systems.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="/careers.html">
                View roles
              </a>
              <a className="btn btn-outline" href="/contact.html">
                Contact
              </a>
            </div>
          </div>
        </section>
      </>
    )
  },

  // ─── Product pages ────────────────────────────────────────────────────────
  'overview.html': {
    title: 'Vortex — Overview',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <a href="/index.html">Home</a>
                  </li>
                  <li>Product</li>
                  <li aria-current="page">Overview</li>
                </ol>
              </nav>
              <h1 className="page-title">Platform essentials at a glance</h1>
              <p className="page-subtitle">
                Vortex brings tasks, dashboards, automations, and collaboration into one
                place—so teams can ship faster with fewer meetings.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Try free
                </a>
                <a className="btn btn-outline" href="/features.html">
                  Explore features
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Quick summary</h4>
              <p>
                Organize work, track progress, and keep everyone aligned with real-time
                updates and flexible views.
              </p>
              <span className="tag">Trusted by 2.5M businesses</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div>
                <span className="tag">Core workflow</span>
                <h2 style={{ fontSize: 34, letterSpacing: '-1px', marginBottom: 12 }}>
                  From planning to delivery
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                  Create spaces for teams, define templates for consistent execution, and
                  automate handoffs so work never stalls.
                </p>
                <ul className="checklist">
                  <li>Spaces for teams, projects, and initiatives</li>
                  <li>Templates for tasks, checklists, and approvals</li>
                  <li>Dashboards for leaders and operators</li>
                  <li>Automations for routing, reminders, and SLAs</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">What you get</span>
                <h3>Everything needed to run operations</h3>
                <p>Start with a clean setup and scale into advanced workflows as your org grows.</p>
                <ul className="checklist">
                  <li>Role-based access and secure sharing</li>
                  <li>Live updates and comments</li>
                  <li>Analytics and insights</li>
                  <li>Integrations with your stack</li>
                </ul>
                <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-primary" href="/pricing.html">
                    Start trial
                  </a>
                  <a className="btn btn-outline" href="/integrations.html">
                    See integrations
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 56 }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 24 }}>
                <h2 style={{ fontSize: 36 }}>Highlights</h2>
                <p style={{ fontSize: 16 }}>A few building blocks that teams use every day.</p>
              </div>
              <div className="content-grid">
                <div className="card">
                  <span className="tag">Automation</span>
                  <h3>Reduce manual work</h3>
                  <p>
                    Auto-assign, route approvals, and trigger notifications based on status
                    and ownership.
                  </p>
                </div>
                <div className="card">
                  <span className="tag">Collaboration</span>
                  <h3>Instant alignment</h3>
                  <p>
                    Comments, mentions, and activity logs keep everyone on the same page—without extra meetings.
                  </p>
                </div>
                <div className="card">
                  <span className="tag">Dashboards</span>
                  <h3>Flexible views</h3>
                  <p>Switch between list, board, and overview dashboards to match how your team works.</p>
                </div>
                <div className="card">
                  <span className="tag">Security</span>
                  <h3>Scale securely</h3>
                  <p>Cloud security, auditability, and sensible defaults designed for growing teams.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page section-gray">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 36 }}>Ready to move faster?</h2>
              <p style={{ fontSize: 16 }}>Start small, then expand—Vortex grows with your team.</p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="/pricing.html">
                Try free
              </a>
              <a className="btn btn-outline" href="/docs.html">
                Read docs
              </a>
            </div>
          </div>
        </section>
      </>
    )
  },

  // Placeholder implementations will be replaced in follow-up patch in this session.
  // (kept here so routing compiles while we port the remaining pages)
  'api.html': {
    title: 'Vortex — API',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>API</span>
              </div>
              <h1 className="page-title">Developer API</h1>
              <p className="page-subtitle">
                Build custom integrations and automations with a simple REST-style API (dummy reference content).
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/docs.html">
                  Developer docs
                </a>
                <a className="btn btn-outline" href="/integrations.html">
                  Integrations
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Authentication</h4>
              <p>Use bearer tokens and least-privilege scopes for safe access.</p>
              <span className="tag">v1</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: 20 }}>
              <h2 style={{ fontSize: 34 }}>Common endpoints</h2>
              <p style={{ fontSize: 16 }}>Quick reference table (swap with real docs later).</p>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Path</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GET</td>
                  <td>/v1/spaces</td>
                  <td>List spaces</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>/v1/spaces</td>
                  <td>Create a space</td>
                </tr>
                <tr>
                  <td>GET</td>
                  <td>/v1/tasks</td>
                  <td>List tasks</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>/v1/tasks</td>
                  <td>Create a task</td>
                </tr>
                <tr>
                  <td>PATCH</td>
                  <td>/v1/tasks/{'{id}'}</td>
                  <td>Update a task</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>/v1/webhooks</td>
                  <td>Register a webhook</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: 34 }} className="two-col">
              <div>
                <span className="tag">Example</span>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>Create a task</h3>
                <pre className="codeblock">
                  <code>{`curl -X POST https://api.vortex.example/v1/tasks \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Review onboarding checklist",
    "spaceId": "spc_123",
    "assigneeId": "usr_456",
    "dueAt": "2026-01-30"
  }'`}</code>
                </pre>
              </div>
              <div>
                <span className="tag">Webhooks</span>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>Receive events</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Subscribe to events like <strong>task.created</strong>, <strong>task.updated</strong>, and{' '}
                  <strong>approval.completed</strong>.
                </p>
                <pre className="codeblock">
                  <code>{`{
  "type": "task.updated",
  "data": {
    "id": "tsk_789",
    "status": "In Progress",
    "updatedAt": "2026-01-16T12:34:56Z"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  // ─── Blog posts ───────────────────────────────────────────────────────────
  'blog-feature-releases.html': {
    title: 'Vortex Blog — Recent feature releases',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Product</span>
              </div>
              <h1 className="page-title">Recent feature releases</h1>
              <p className="page-subtitle">
                What’s new this month: workflow automation, dashboards, and faster collaboration.
              </p>
              <div className="update-meta">
                <span>Jan 2026</span>
                <span className="dot">•</span>
                <span>5 min read</span>
                <span className="dot">•</span>
                <span>Product</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Keep shipping</h4>
              <p>Small improvements compound. Here are the highlights (dummy post content).</p>
              <a className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
                Back to Blog
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">Highlights</span>
                <h3>1) Automations that stay readable</h3>
                <p>
                  Define routing and reminders with clear rules so teams trust what’s happening in the background.
                </p>
                <ul className="checklist">
                  <li>Smarter triggers (status, owner, due dates)</li>
                  <li>Clean handoffs between teams</li>
                  <li>Less manual follow-up</li>
                </ul>
                <div style={{ height: 14 }} />
                <h3>2) More flexible dashboards</h3>
                <p>Switch between views and share dashboards that match how stakeholders consume progress.</p>
                <div style={{ height: 14 }} />
                <h3>3) Collaboration improvements</h3>
                <p>Faster activity updates and cleaner conversations so work stays in one place.</p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>Keep reading</h3>
                <p>More articles you can link as you expand your blog.</p>
                <ul className="checklist">
                  <li>
                    <a href="/blog-security-update-overview.html">Security update overview</a>
                  </li>
                  <li>
                    <a href="/blog-weekly-roundup.html">Weekly update roundup</a>
                  </li>
                  <li>
                    <a href="/blog-saas-trends.html">Industry trends: what&apos;s next in SaaS</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog-onboarding-best-practices.html': {
    title: 'Vortex Blog — Onboarding best practices',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Guides</span>
              </div>
              <h1 className="page-title">Onboarding best practices</h1>
              <p className="page-subtitle">
                Get your org productive quickly with roles, defaults, and a clean first sprint.
              </p>
              <div className="update-meta">
                <span>Dec 2025</span>
                <span className="dot">•</span>
                <span>6 min read</span>
                <span className="dot">•</span>
                <span>Guides</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Pro tip</h4>
              <p>Start with one team and one workflow template, then expand once it’s working.</p>
              <a className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
                Back to Blog
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">Checklist</span>
                <h3>Week 1: Setup</h3>
                <ul className="checklist">
                  <li>Create spaces for teams and projects</li>
                  <li>Define roles and permissions</li>
                  <li>Pick 1–2 templates for repeatable tasks</li>
                  <li>Set a “definition of done” checklist</li>
                </ul>
                <div style={{ height: 14 }} />
                <h3>Week 2: Make it stick</h3>
                <ul className="checklist">
                  <li>Add simple automations (assignments + reminders)</li>
                  <li>Create a dashboard for leaders</li>
                  <li>Publish a quick guide for the team</li>
                </ul>
                <div style={{ height: 14 }} />
                <h3>Week 3+: Scale</h3>
                <p>Duplicate what works into adjacent teams and connect integrations as you go.</p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>More guides</h3>
                <ul className="checklist">
                  <li>
                    <a href="/blog-workspace-customization.html">Customize your workspace</a>
                  </li>
                  <li>
                    <a href="/blog-feature-releases.html">Recent feature releases</a>
                  </li>
                  <li>
                    <a href="/blog-weekly-roundup.html">Weekly update roundup</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog-saas-trends.html': {
    title: "Vortex Blog — Industry trends: what's next in SaaS",
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Insights</span>
              </div>
              <h1 className="page-title">Industry trends: what&apos;s next in SaaS</h1>
              <p className="page-subtitle">
                From AI copilots to secure-by-default workflows—how teams are evolving delivery.
              </p>
              <div className="update-meta">
                <span>Jan 2026</span>
                <span className="dot">•</span>
                <span>9 min read</span>
                <span className="dot">•</span>
                <span>Insights</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Takeaway</h4>
              <p>Teams are optimizing for clarity and speed—without sacrificing governance.</p>
              <a className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
                Back to Blog
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">Trends</span>
                <h3>1) AI copilots (and human-readable workflows)</h3>
                <p>
                  Assistive AI is useful when it supports clear processes—suggesting next steps, not hiding logic.
                </p>
                <div style={{ height: 14 }} />
                <h3>2) Secure-by-default systems</h3>
                <p>
                  As teams scale, access control and auditability become table stakes—not enterprise “extras.”
                </p>
                <div style={{ height: 14 }} />
                <h3>3) Outcome-driven dashboards</h3>
                <p>
                  Teams want fewer vanity charts and more dashboards tied to actual delivery and operations results.
                </p>
                <div style={{ height: 14 }} />
                <h3>4) Integrations over tool sprawl</h3>
                <p>Instead of adding tools, teams connect the ones they already trust.</p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>Recommended</h3>
                <ul className="checklist">
                  <li>
                    <a href="/blog-feature-releases.html">Recent feature releases</a>
                  </li>
                  <li>
                    <a href="/blog-security-update-overview.html">Security update overview</a>
                  </li>
                  <li>
                    <a href="/blog-weekly-roundup.html">Weekly update roundup</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog-security-update-overview.html': {
    title: 'Vortex Blog — Security update overview',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Security</span>
              </div>
              <h1 className="page-title">Security update overview</h1>
              <p className="page-subtitle">
                Your data stays secure with enhanced audit logs, tighter access controls, and safer defaults.
              </p>
              <div className="update-meta">
                <span>Jan 2026</span>
                <span className="dot">•</span>
                <span>4 min read</span>
                <span className="dot">•</span>
                <span>Security</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Security hub</h4>
              <p>For a high-level overview of security and compliance, see the security pages.</p>
              <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn btn-outline" href="/security.html">
                  Security
                </a>
                <a className="btn btn-outline" href="/compliance.html">
                  Compliance
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">What’s improved</span>
                <h3>1) Clearer audit trails</h3>
                <p>More complete activity history so admins can review sensitive changes (dummy content).</p>
                <div style={{ height: 14 }} />
                <h3>2) Stronger access controls</h3>
                <p>Better role-based permissions and clearer space ownership.</p>
                <div style={{ height: 14 }} />
                <h3>3) Safer defaults</h3>
                <p>Secure-by-default settings to reduce accidental data exposure.</p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>Read next</h3>
                <ul className="checklist">
                  <li>
                    <a href="/blog-feature-releases.html">Recent feature releases</a>
                  </li>
                  <li>
                    <a href="/blog-saas-trends.html">Industry trends: what&apos;s next in SaaS</a>
                  </li>
                  <li>
                    <a href="/blog-weekly-roundup.html">Weekly update roundup</a>
                  </li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btn-outline" href="/blog.html">
                    Back to Blog
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog-weekly-roundup.html': {
    title: 'Vortex Blog — Weekly update roundup',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Insights</span>
              </div>
              <h1 className="page-title">Weekly update roundup</h1>
              <p className="page-subtitle">
                Recent changes at a glance—new features, improvements, and what’s coming next.
              </p>
              <div className="update-meta">
                <span>Nov 2025</span>
                <span className="dot">•</span>
                <span>4 min read</span>
                <span className="dot">•</span>
                <span>Insights</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Format</h4>
              <p>A quick scan for busy teams (dummy content).</p>
              <a className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
                Back to Blog
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">This week</span>
                <h3>Shipped</h3>
                <ul className="checklist">
                  <li>Cleaner updates cards and filtering</li>
                  <li>Improved dashboard layout options</li>
                  <li>Better onboarding defaults</li>
                </ul>
                <div style={{ height: 14 }} />
                <h3>Improved</h3>
                <ul className="checklist">
                  <li>Faster page loads (dummy)</li>
                  <li>More consistent navigation</li>
                </ul>
                <div style={{ height: 14 }} />
                <h3>Next</h3>
                <p>Integrations expansion and security polishing.</p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>Read next</h3>
                <ul className="checklist">
                  <li>
                    <a href="/blog-feature-releases.html">Recent feature releases</a>
                  </li>
                  <li>
                    <a href="/blog-security-update-overview.html">Security update overview</a>
                  </li>
                  <li>
                    <a href="/blog-onboarding-best-practices.html">Onboarding best practices</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog-workspace-customization.html': {
    title: 'Vortex Blog — Customize your workspace',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <a href="/blog.html">Blog</a>
                <span>›</span>
                <span>Guides</span>
              </div>
              <h1 className="page-title">Customize your workspace</h1>
              <p className="page-subtitle">
                Personalize views, saved filters, and dashboards so every team sees what they need.
              </p>
              <div className="update-meta">
                <span>Oct 2025</span>
                <span className="dot">•</span>
                <span>7 min read</span>
                <span className="dot">•</span>
                <span>Guides</span>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Goal</h4>
              <p>Make important work obvious and reduce noise for each role.</p>
              <a className="btn btn-outline" href="/blog.html" style={{ marginTop: 10 }}>
                Back to Blog
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <article className="card">
                <span className="tag">Steps</span>
                <h3>1) Start with a default dashboard</h3>
                <p>Pick a single dashboard that reflects your weekly priorities and outcomes.</p>
                <div style={{ height: 14 }} />
                <h3>2) Create saved views</h3>
                <p>
                  Saved filters help each role focus: owners, reviewers, and leaders all see different slices.
                </p>
                <div style={{ height: 14 }} />
                <h3>3) Keep naming consistent</h3>
                <p>
                  Use a consistent vocabulary for statuses and types so teams don’t interpret workflows differently.
                </p>
                <div style={{ height: 14 }} />
                <h3>4) Use gentle automation</h3>
                <p>
                  Auto-assign and route work, but keep rules readable so the team understands why actions happen.
                </p>
              </article>
              <aside className="card">
                <span className="tag">Related</span>
                <h3>More guides</h3>
                <ul className="checklist">
                  <li>
                    <a href="/blog-onboarding-best-practices.html">Onboarding best practices</a>
                  </li>
                  <li>
                    <a href="/blog-feature-releases.html">Recent feature releases</a>
                  </li>
                  <li>
                    <a href="/blog-weekly-roundup.html">Weekly update roundup</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </>
    )
  },
  'blog.html': {
    title: 'Vortex — Blog',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Company</span>
                <span>›</span>
                <span>Blog</span>
              </div>
              <h1 className="page-title">Fresh insights. Real impact.</h1>
              <p className="page-subtitle">
                Product updates, guides, and industry news—all in one place. (Dummy posts you can replace later.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/guides.html">
                  Browse guides
                </a>
                <a className="btn btn-outline" href="/features.html">
                  Product updates
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Topics</h4>
              <p>Product, guides, insights, security, and operations.</p>
              <span className="tag">Updated weekly</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid" id="blog-posts" data-source="contentstack">
              <a className="card card-link" href="/blog-feature-releases.html" aria-label="Read: Recent feature releases">
                <span className="tag">Product</span>
                <h3>Recent feature releases</h3>
                <p>What’s new this month: workflow automation, dashboards, and faster collaboration.</p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>5 min read</span>
                </div>
              </a>
              <a
                className="card card-link"
                href="/blog-onboarding-best-practices.html"
                aria-label="Read: Onboarding best practices"
              >
                <span className="tag">Guides</span>
                <h3>Onboarding best practices</h3>
                <p>Get your org productive quickly with roles, defaults, and a clean first sprint.</p>
                <div className="update-meta">
                  <span>Dec 2025</span>
                  <span className="dot">•</span>
                  <span>6 min read</span>
                </div>
              </a>
              <a
                className="card card-link"
                href="/blog-saas-trends.html"
                aria-label="Read: Industry trends: what's next in SaaS"
              >
                <span className="tag">Insights</span>
                <h3>Industry trends: what&apos;s next in SaaS</h3>
                <p>How modern teams are evolving delivery with secure-by-default workflows.</p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>9 min read</span>
                </div>
              </a>
              <a
                className="card card-link"
                href="/blog-security-update-overview.html"
                aria-label="Read: Security update overview"
              >
                <span className="tag">Security</span>
                <h3>Security update overview</h3>
                <p>Audit logs, access controls, and best practices for scaling securely.</p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>4 min read</span>
                </div>
              </a>
              <a
                className="card card-link"
                href="/blog-workspace-customization.html"
                aria-label="Read: Customize your workspace"
              >
                <span className="tag">Guides</span>
                <h3>Customize your workspace</h3>
                <p>Personalize views and dashboards so every team sees what they need.</p>
                <div className="update-meta">
                  <span>Oct 2025</span>
                  <span className="dot">•</span>
                  <span>7 min read</span>
                </div>
              </a>
              <a
                className="card card-link"
                href="/blog-weekly-roundup.html"
                aria-label="Read: Weekly update roundup"
              >
                <span className="tag">Insights</span>
                <h3>Weekly update roundup</h3>
                <p>Recent changes at a glance—what’s improved and what’s coming next.</p>
                <div className="update-meta">
                  <span>Nov 2025</span>
                  <span className="dot">•</span>
                  <span>4 min read</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </>
    )
  },
  'careers.html': {
    title: 'Vortex — Careers',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Company</span>
                <span>›</span>
                <span>Careers</span>
              </div>
              <h1 className="page-title">Join the team</h1>
              <p className="page-subtitle">
                Help us build a calm, powerful workflow platform for modern teams. (Dummy roles and content.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/contact.html">
                  Apply now
                </a>
                <a className="btn btn-outline" href="/about.html">
                  About Vortex
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Benefits</h4>
              <p>Remote-friendly, flexible time, and ownership-driven culture.</p>
              <span className="tag">Hiring</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 34 }}>Open roles</h2>
              <p style={{ fontSize: 16 }}>A few example positions.</p>
            </div>
            <div className="content-grid">
              <div className="card">
                <span className="tag">Engineering</span>
                <h3>Frontend Engineer</h3>
                <p>Build polished, accessible UI with excellent performance.</p>
                <div className="update-meta">
                  <span>Remote</span>
                  <span className="dot">•</span>
                  <span>Full-time</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Engineering</span>
                <h3>Backend Engineer</h3>
                <p>Design APIs and systems that are reliable and secure.</p>
                <div className="update-meta">
                  <span>Remote</span>
                  <span className="dot">•</span>
                  <span>Full-time</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Design</span>
                <h3>Product Designer</h3>
                <p>Craft UX flows and UI polish across the platform.</p>
                <div className="update-meta">
                  <span>Remote</span>
                  <span className="dot">•</span>
                  <span>Full-time</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Growth</span>
                <h3>Content & Community</h3>
                <p>Grow the community and produce helpful guides.</p>
                <div className="update-meta">
                  <span>Hybrid</span>
                  <span className="dot">•</span>
                  <span>Full-time</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 52 }} className="two-col">
              <div className="card">
                <span className="tag">Our culture</span>
                <h3>How we work</h3>
                <p>
                  We optimize for clarity, craft, and outcomes. We write things down, measure results, and ship improvements every week.
                </p>
                <ul className="checklist">
                  <li>High ownership</li>
                  <li>Direct communication</li>
                  <li>Strong product sense</li>
                  <li>Care for the details</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">Apply</span>
                <h3>Send us a note</h3>
                <p>Use the contact form to share your background and what you want to build.</p>
                <a className="btn btn-primary" href="/contact.html" style={{ marginTop: 14 }}>
                  Go to contact
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'community.html': {
    title: 'Vortex — Community',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Resources</span>
                <span>›</span>
                <span>Community</span>
              </div>
              <h1 className="page-title">Connect and share insights</h1>
              <p className="page-subtitle">
                Join the community to learn workflows, share templates, and get help from other builders.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/forum.html">
                  Visit forum
                </a>
                <a className="btn btn-outline" href="/guides.html">
                  Browse guides
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Community perks</h4>
              <p>Templates, events, and best practices from real teams.</p>
              <span className="tag">New weekly</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Templates</span>
                <h3>Share workflows</h3>
                <p>Publish templates for onboarding, incident response, and project execution.</p>
              </div>
              <div className="card">
                <span className="tag">Events</span>
                <h3>Webinars & meetups</h3>
                <p>Join live sessions to see how top teams run operations with Vortex.</p>
              </div>
              <div className="card">
                <span className="tag">Support</span>
                <h3>Get answers fast</h3>
                <p>Ask questions, share context, and learn from other builders.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'compliance.html': {
    title: 'Vortex — Compliance',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Legal</span>
                <span>›</span>
                <span>Compliance</span>
              </div>
              <h1 className="page-title">Compliance</h1>
              <p className="page-subtitle">
                Placeholder compliance overview. Replace with your actual compliance posture and certifications.
              </p>
            </div>
            <aside className="hero-aside">
              <h4>Need details?</h4>
              <p>Contact us for questionnaires and security reviews.</p>
              <a className="btn btn-primary" href="/contact.html" style={{ marginTop: 10 }}>
                Contact
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Controls</span>
                <h3>Operational controls</h3>
                <p>Document access controls, change management, and incident response processes.</p>
              </div>
              <div className="card">
                <span className="tag">Data</span>
                <h3>Data protection</h3>
                <p>Define retention, deletion, encryption, and privacy practices for customer data.</p>
              </div>
              <div className="card">
                <span className="tag">Reviews</span>
                <h3>Vendor & risk</h3>
                <p>Maintain vendor inventory, security reviews, and risk assessments.</p>
              </div>
              <div className="card">
                <span className="tag">Policies</span>
                <h3>Policies & training</h3>
                <p>Security training, acceptable use, and internal policy documentation.</p>
              </div>
            </div>

            <div style={{ marginTop: 44 }} className="two-col">
              <div className="card">
                <span className="tag">Related</span>
                <h3>Privacy & security</h3>
                <p>Keep your legal pages aligned with actual practices.</p>
                <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-outline" href="/privacy.html">
                    Privacy
                  </a>
                  <a className="btn btn-outline" href="/security.html">
                    Security
                  </a>
                </div>
              </div>
              <div className="card">
                <span className="tag">Enterprise</span>
                <h3>Enterprise readiness</h3>
                <p>See how Vortex supports scale and governance for larger organizations.</p>
                <a className="btn btn-outline" href="/enterprise.html" style={{ marginTop: 14 }}>
                  Enterprise
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'contact.html': {
    title: 'Vortex — Contact',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Company</span>
                <span>›</span>
                <span>Contact</span>
              </div>
              <h1 className="page-title">Contact us</h1>
              <p className="page-subtitle">
                Questions about Vortex, pricing, or enterprise needs? Send a message (dummy form).
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  View pricing
                </a>
                <a className="btn btn-outline" href="/support.html">
                  Support
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Typical response</h4>
              <p>Within 1–2 business days.</p>
              <span className="tag">Support-friendly</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">Send a message</span>
                <h3>We’d love to hear from you</h3>
                <form className="form" action="#" method="post">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" name="topic">
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Press</option>
                      <option>Careers</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="How can we help?" required />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Send
                  </button>
                  <p className="muted">This is a static demo form (no backend wired).</p>
                </form>
              </div>
              <div>
                <div className="card">
                  <span className="tag">Support</span>
                  <h3>Need help?</h3>
                  <p>Start with the help center, guides, and FAQ. Check system status for incidents.</p>
                  <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a className="btn btn-outline" href="/help.html">
                      Help center
                    </a>
                    <a className="btn btn-outline" href="/status.html">
                      Status
                    </a>
                  </div>
                </div>
                <div style={{ height: 16 }} />
                <div className="card">
                  <span className="tag">Company</span>
                  <h3>Press & careers</h3>
                  <p>For media inquiries, see press. For roles, see careers.</p>
                  <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a className="btn btn-outline" href="/press.html">
                      Press
                    </a>
                    <a className="btn btn-outline" href="/careers.html">
                      Careers
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'cookies.html': {
    title: 'Vortex — Cookies',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Legal</span>
                <span>›</span>
                <span>Cookies</span>
              </div>
              <h1 className="page-title">Cookie Policy</h1>
              <p className="page-subtitle">
                Placeholder cookie information. Replace with your actual cookie policy.
              </p>
            </div>
            <aside className="hero-aside">
              <h4>Related</h4>
              <p>Privacy and terms.</p>
              <span className="tag">Legal</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="card">
              <span className="tag">Placeholder</span>
              <h3>Common cookie types</h3>
              <ul className="checklist">
                <li>Essential cookies (login sessions, security)</li>
                <li>Preferences (UI settings)</li>
                <li>Analytics (usage measurement)</li>
                <li>Marketing (if applicable)</li>
              </ul>
              <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
                If you add analytics/marketing scripts later, update this page accordingly.
              </p>
              <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn btn-outline" href="/privacy.html">
                  Privacy
                </a>
                <a className="btn btn-outline" href="/terms.html">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'docs.html': {
    title: 'Vortex — Docs',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Resources</span>
                <span>›</span>
                <span>Docs</span>
              </div>
              <h1 className="page-title">Developer guides and APIs</h1>
              <p className="page-subtitle">
                Dummy documentation content you can replace with real guides, tutorials, and references.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/api.html">
                  API reference
                </a>
                <a className="btn btn-outline" href="/guides.html">
                  Guides
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Getting started</h4>
              <p>Start with spaces, tasks, and automation rules.</p>
              <span className="tag">Docs v1</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">Docs</span>
                <h3>Common topics</h3>
                <ul className="checklist">
                  <li>Spaces & permissions</li>
                  <li>Tasks & templates</li>
                  <li>Automations</li>
                  <li>Webhooks</li>
                  <li>Integrations</li>
                </ul>
              </div>
              <div>
                <span className="tag">Example</span>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>Authenticate</h3>
                <pre className="codeblock">
                  <code>Authorization: Bearer &lt;token&gt;</code>
                </pre>
                <div style={{ height: 12 }} />
                <span className="tag">Example</span>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>List tasks</h3>
                <pre className="codeblock">
                  <code>GET /v1/tasks?spaceId=spc_123&amp;status=In%20Progress</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'enterprise.html': {
    title: 'Vortex — Enterprise',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Use cases</span>
                <span>›</span>
                <span>Enterprise</span>
              </div>
              <h1 className="page-title">Scale securely and reliably</h1>
              <p className="page-subtitle">
                Enterprise-ready workflows with governance, access controls, and auditability built in.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/contact.html">
                  Contact sales
                </a>
                <a className="btn btn-outline" href="/security.html">
                  Security
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Enterprise controls</h4>
              <p>SSO patterns, audit trails, and policy-driven workflows.</p>
              <span className="tag">Compliance-ready</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Governance</span>
                <h3>Standardize processes</h3>
                <p>Templates and approvals ensure teams follow consistent, auditable steps.</p>
              </div>
              <div className="card">
                <span className="tag">Security</span>
                <h3>Least privilege access</h3>
                <p>Role-based access controls and clear ownership across spaces.</p>
              </div>
              <div className="card">
                <span className="tag">Reliability</span>
                <h3>Operational visibility</h3>
                <p>Dashboards and status signals help leaders manage at scale.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'faq.html': {
    title: 'Vortex — FAQ',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Support</span>
                <span>›</span>
                <span>FAQ</span>
              </div>
              <h1 className="page-title">FAQ</h1>
              <p className="page-subtitle">
                Common questions about setup, pricing, security, and billing. (Dummy Q&amp;A.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Pricing
                </a>
                <a className="btn btn-outline" href="/help.html">
                  Help center
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Still stuck?</h4>
              <p>Contact support and we’ll help you out.</p>
              <span className="tag">Fast answers</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">General</span>
                <h3>Top questions</h3>
                <details open style={{ marginTop: 12 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Is there a free trial?</summary>
                  <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                    Yes — the demo pricing page reflects a 14-day trial with no credit card (replace with real policy).
                  </p>
                </details>
                <details style={{ marginTop: 12 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Can we invite teammates?</summary>
                  <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                    Yes — invite teammates into spaces and manage roles and permissions.
                  </p>
                </details>
                <details style={{ marginTop: 12 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
                    Does Vortex support integrations?
                  </summary>
                  <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                    Yes — connect common tools and build custom integrations via API.
                  </p>
                </details>
                <details style={{ marginTop: 12 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700 }}>How do you handle security?</summary>
                  <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                    Role-based access, auditability, and secure defaults. See the security page for details.
                  </p>
                </details>
              </div>
              <div>
                <div className="card">
                  <span className="tag">Billing</span>
                  <h3>Billing & plans</h3>
                  <details open style={{ marginTop: 12 }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>How do plans work?</summary>
                    <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                      Choose Starter, Pro, or Enterprise depending on features and controls needed.
                    </p>
                  </details>
                  <details style={{ marginTop: 12 }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Can we change plans later?</summary>
                    <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                      Yes — upgrade/downgrade anytime (dummy policy).
                    </p>
                  </details>
                  <details style={{ marginTop: 12 }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Do you offer refunds?</summary>
                    <p style={{ marginTop: 10, color: 'var(--text-secondary)' }}>
                      This is placeholder text. Replace with your real billing/refund policy.
                    </p>
                  </details>
                  <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a className="btn btn-primary" href="/contact.html">
                      Contact sales
                    </a>
                    <a className="btn btn-outline" href="/terms.html">
                      Terms
                    </a>
                  </div>
                </div>
                <div style={{ height: 16 }} />
                <div className="card">
                  <span className="tag">More help</span>
                  <h3>Support resources</h3>
                  <p>Browse guides, ask in the forum, or check system status.</p>
                  <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a className="btn btn-outline" href="/guides.html">
                      Guides
                    </a>
                    <a className="btn btn-outline" href="/forum.html">
                      Forum
                    </a>
                    <a className="btn btn-outline" href="/status.html">
                      Status
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'features.html': {
    title: 'Vortex — Features',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Product</span>
                <span>›</span>
                <span>Features</span>
              </div>
              <h1 className="page-title">Key tools and capabilities</h1>
              <p className="page-subtitle">
                Everything you need to plan, execute, and measure work—built for speed, clarity, and scale.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Try free
                </a>
                <a className="btn btn-outline" href="/integrations.html">
                  View integrations
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Feature highlights</h4>
              <p>
                Automations, collaboration, dashboards, insights, security, and integrations—packaged into a clean workflow.
              </p>
              <span className="tag">Updated monthly</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 36 }}>Build your workflow your way</h2>
              <p style={{ fontSize: 16 }}>Pick the pieces you need today, and expand later without rebuilding.</p>
            </div>

            <div className="content-grid">
              <div className="card">
                <span className="tag">⚡ Automations</span>
                <h3>Automate daily operations</h3>
                <p>Trigger actions on status changes, assignments, due dates, and custom rules.</p>
                <ul className="checklist">
                  <li>Auto-assign ownership</li>
                  <li>Approval routing</li>
                  <li>SLA reminders</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">👥 Collaboration</span>
                <h3>Work in real time</h3>
                <p>Comments, mentions, and activity keep teams aligned without switching tools.</p>
                <ul className="checklist">
                  <li>Live updates</li>
                  <li>Threaded comments</li>
                  <li>Shared spaces</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">📊 Dashboards</span>
                <h3>Flexible views</h3>
                <p>Go from high-level to task-level with dashboards tuned to your workflow.</p>
                <ul className="checklist">
                  <li>Team overview</li>
                  <li>Board & list views</li>
                  <li>Saved filters</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">📈 Insights</span>
                <h3>Measure what matters</h3>
                <p>Turn activity into outcomes with analytics your team actually uses.</p>
                <ul className="checklist">
                  <li>Cycle time</li>
                  <li>Throughput</li>
                  <li>Weekly rollups</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">🔒 Security</span>
                <h3>Secure by default</h3>
                <p>Protect your data with access controls, audit trails, and sane defaults.</p>
                <ul className="checklist">
                  <li>Role-based access</li>
                  <li>Audit logs</li>
                  <li>SSO-ready patterns</li>
                </ul>
              </div>
              <div className="card">
                <span className="tag">🔗 Integrations</span>
                <h3>Works with your stack</h3>
                <p>Connect tools you already use to keep work flowing across teams.</p>
                <ul className="checklist">
                  <li>Slack & email</li>
                  <li>Jira & GitHub</li>
                  <li>Custom API</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page section-gray">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">Best practices</span>
                <h3>Start simple</h3>
                <p>
                  Launch with one team and one template, then expand across departments once the workflow is proven.
                </p>
              </div>
              <div className="card">
                <span className="tag">Next step</span>
                <h3>Connect your tools</h3>
                <p>
                  Integrate your chat, tickets, and repos so work moves forward with fewer handoffs.
                </p>
                <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-primary" href="/integrations.html">
                    Browse integrations
                  </a>
                  <a className="btn btn-outline" href="/docs.html">
                    Read docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'forum.html': {
    title: 'Vortex — Forum',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Support</span>
                <span>›</span>
                <span>Forum</span>
              </div>
              <h1 className="page-title">Community forum</h1>
              <p className="page-subtitle">
                Ask questions, share templates, and learn from other teams. (Static demo forum.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/community.html">
                  Community
                </a>
                <a className="btn btn-outline" href="/help.html">
                  Help center
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Posting</h4>
              <p>This is a static demo page; no posting functionality is wired.</p>
              <span className="tag">Forum</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 34 }}>Topics</h2>
              <p style={{ fontSize: 16 }}>Example categories and recent threads.</p>
            </div>

            <div className="content-grid">
              <div className="card">
                <span className="tag">Getting started</span>
                <h3>Setup & onboarding</h3>
                <p>Spaces, templates, and first-week workflows.</p>
              </div>
              <div className="card">
                <span className="tag">Automation</span>
                <h3>Automations</h3>
                <p>Rules, routing, reminders, and SLAs.</p>
              </div>
              <div className="card">
                <span className="tag">Integrations</span>
                <h3>Integrations</h3>
                <p>Slack/Jira/GitHub connections and troubleshooting.</p>
              </div>
              <div className="card">
                <span className="tag">Security</span>
                <h3>Security & admin</h3>
                <p>Roles, access control, audit logs, and best practices.</p>
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 16 }}>
                <h2 style={{ fontSize: 34 }}>Recent threads</h2>
                <p style={{ fontSize: 16 }}>Dummy threads list.</p>
              </div>
              <div className="content-grid">
                <div className="card">
                  <span className="tag">Question</span>
                  <h3>Best onboarding template for support teams?</h3>
                  <p>Looking for a simple workflow to route tickets and track outcomes.</p>
                  <div className="update-meta">
                    <span>2 replies</span>
                    <span className="dot">•</span>
                    <span>Jan 2026</span>
                  </div>
                </div>
                <div className="card">
                  <span className="tag">Tip</span>
                  <h3>How we set up notifications without noise</h3>
                  <p>Using role-based alerts and status-based routing to stay focused.</p>
                  <div className="update-meta">
                    <span>5 replies</span>
                    <span className="dot">•</span>
                    <span>Dec 2025</span>
                  </div>
                </div>
                <div className="card">
                  <span className="tag">Help</span>
                  <h3>Integration sync delay</h3>
                  <p>Seeing delayed updates from Jira; any recommended settings?</p>
                  <div className="update-meta">
                    <span>1 reply</span>
                    <span className="dot">•</span>
                    <span>Nov 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'guides.html': {
    title: 'Vortex — Guides',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Support</span>
                <span>›</span>
                <span>Guides</span>
              </div>
              <h1 className="page-title">Guides</h1>
              <p className="page-subtitle">
                Step-by-step best practices to streamline operations and onboard teams faster. (Dummy content.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/docs.html">
                  Developer docs
                </a>
                <a className="btn btn-outline" href="/community.html">
                  Community
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Popular</h4>
              <p>Onboarding, notifications, and dashboards.</p>
              <span className="tag">Guides</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Onboarding</span>
                <h3>Onboarding best practices</h3>
                <p>Get your org productive in 30 minutes with roles, defaults, and a clean first sprint.</p>
                <div className="update-meta">
                  <span>Dec 2025</span>
                  <span className="dot">•</span>
                  <span>6 min read</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Workflow</span>
                <h3>Streamline your workflow fast</h3>
                <p>Set up spaces, templates, and automations that stick.</p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>7 min read</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Notifications</span>
                <h3>Set up notifications (without the noise)</h3>
                <p>Build signal-first alerts for assignments, blockers, and approvals—team by team.</p>
                <div className="update-meta">
                  <span>Nov 2025</span>
                  <span className="dot">•</span>
                  <span>6 min read</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Dashboards</span>
                <h3>Customize your workspace</h3>
                <p>Personalize views, saved filters, and dashboards so every team sees what they need.</p>
                <div className="update-meta">
                  <span>Oct 2025</span>
                  <span className="dot">•</span>
                  <span>7 min read</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Integrations</span>
                <h3>Connect your stack</h3>
                <p>Link Slack, Jira, and GitHub so handoffs don’t slow you down.</p>
                <div className="update-meta">
                  <span>Nov 2025</span>
                  <span className="dot">•</span>
                  <span>5 min read</span>
                </div>
              </div>
              <div className="card">
                <span className="tag">Security</span>
                <h3>Operate securely</h3>
                <p>Roles, audit trails, and best practices for safe collaboration.</p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>4 min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'help.html': {
    title: 'Vortex — Help',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Support</span>
                <span>›</span>
                <span>Help</span>
              </div>
              <h1 className="page-title">Help center</h1>
              <p className="page-subtitle">
                Find answers, troubleshoot issues, and learn best practices. (Static demo content.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/guides.html">
                  Guides
                </a>
                <a className="btn btn-outline" href="/status.html">
                  Status
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Common help topics</h4>
              <p>Accounts, permissions, billing, integrations, and troubleshooting.</p>
              <span className="tag">Help</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">Search (placeholder)</span>
                <h3>What do you need?</h3>
                <form className="form" action="#" method="get">
                  <div>
                    <label htmlFor="q">Search</label>
                    <input id="q" name="q" type="text" placeholder="Search help articles…" />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                  <p className="muted">Static demo: search isn’t wired.</p>
                </form>
              </div>
              <div className="card">
                <span className="tag">Getting started</span>
                <h3>Top articles</h3>
                <ul className="checklist">
                  <li>How to create your first space</li>
                  <li>Invite teammates and set roles</li>
                  <li>Use templates for repeatable work</li>
                  <li>Set up automations and notifications</li>
                  <li>Connect integrations</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="section-header" style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: 34 }}>Browse categories</h2>
                <p style={{ fontSize: 16 }}>Start here if you’re not sure what to search for.</p>
              </div>
              <div className="content-grid">
                <div className="card">
                  <span className="tag">Account</span>
                  <h3>Account & profile</h3>
                  <p>Login, profile settings, and account basics.</p>
                </div>
                <div className="card">
                  <span className="tag">Permissions</span>
                  <h3>Access & roles</h3>
                  <p>How permissions work across spaces and teams.</p>
                </div>
                <div className="card">
                  <span className="tag">Billing</span>
                  <h3>Billing</h3>
                  <p>Plans, invoices, and payment methods.</p>
                </div>
                <div className="card">
                  <span className="tag">Integrations</span>
                  <h3>Integrations</h3>
                  <p>Connect external tools and troubleshoot sync issues.</p>
                </div>
                <div className="card">
                  <span className="tag">Troubleshooting</span>
                  <h3>Troubleshooting</h3>
                  <p>Fix common issues and learn best practices.</p>
                </div>
                <div className="card">
                  <span className="tag">Community</span>
                  <h3>Community</h3>
                  <p>Ask questions and learn from other teams.</p>
                  <a className="btn btn-outline" href="/forum.html" style={{ marginTop: 14 }}>
                    Forum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'integrations.html': {
    title: 'Vortex — Integrations',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Product</span>
                <span>›</span>
                <span>Integrations</span>
              </div>
              <h1 className="page-title">Works with your stack</h1>
              <p className="page-subtitle">
                Connect your essential tools to keep work flowing—no more copy/paste status updates.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/docs.html">
                  Integration docs
                </a>
                <a className="btn btn-outline" href="/api.html">
                  API reference
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Popular categories</h4>
              <p>Chat, tickets, repos, identity, and analytics.</p>
              <span className="tag">Fast setup</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 36 }}>Popular integrations</h2>
              <p style={{ fontSize: 16 }}>Dummy integration tiles you can later swap for real logos.</p>
            </div>

            <div className="content-grid">
              <div className="card">
                <span className="tag">Chat</span>
                <h3>Slack</h3>
                <p>Notify channels on task changes and approvals.</p>
              </div>
              <div className="card">
                <span className="tag">Chat</span>
                <h3>Microsoft Teams</h3>
                <p>Share updates and receive actionable alerts.</p>
              </div>
              <div className="card">
                <span className="tag">Dev</span>
                <h3>GitHub</h3>
                <p>Link PRs to tasks and track delivery progress.</p>
              </div>
              <div className="card">
                <span className="tag">Dev</span>
                <h3>Jira</h3>
                <p>Sync work items and keep priorities aligned.</p>
              </div>
              <div className="card">
                <span className="tag">Tickets</span>
                <h3>Zendesk</h3>
                <p>Route tickets into workflows with ownership rules.</p>
              </div>
              <div className="card">
                <span className="tag">CRM</span>
                <h3>Salesforce</h3>
                <p>Turn customer events into coordinated actions.</p>
              </div>
              <div className="card">
                <span className="tag">Identity</span>
                <h3>Okta</h3>
                <p>SSO patterns for centralized access management.</p>
              </div>
              <div className="card">
                <span className="tag">Analytics</span>
                <h3>Segment</h3>
                <p>Send events to power dashboards and insights.</p>
              </div>
              <div className="card">
                <span className="tag">Email</span>
                <h3>Gmail</h3>
                <p>Create tasks from email and keep threads linked.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page section-gray">
          <div className="container">
            <div className="two-col">
              <div className="card">
                <span className="tag">Build your own</span>
                <h3>Custom integrations</h3>
                <p>Use the API and webhooks to connect internal systems to Vortex workflows.</p>
                <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-primary" href="/api.html">
                    Open API
                  </a>
                  <a className="btn btn-outline" href="/docs.html">
                    Docs
                  </a>
                </div>
              </div>
              <div className="card">
                <span className="tag">Security</span>
                <h3>Safe by design</h3>
                <p>Integrations follow least-privilege patterns with auditability and sensible defaults.</p>
                <a className="btn btn-outline" href="/security.html" style={{ marginTop: 14 }}>
                  Security overview
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'press.html': {
    title: 'Vortex — Press',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Company</span>
                <span>›</span>
                <span>Press</span>
              </div>
              <h1 className="page-title">Press & media</h1>
              <p className="page-subtitle">Press kit, brand assets, and announcements (dummy content).</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/contact.html">
                  Press inquiries
                </a>
                <a className="btn btn-outline" href="/about.html">
                  Company info
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Brand assets</h4>
              <p>Use the official name and logo when referencing Vortex.</p>
              <span className="tag">Press kit</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Logo</span>
                <h3>Vortex logo</h3>
                <p>Download the logo as SVG or use the icon mark included in this site.</p>
                <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-outline" href="/logo.svg">
                    Open SVG
                  </a>
                  <a className="btn btn-primary" href="/contact.html">
                    Request assets
                  </a>
                </div>
              </div>
              <div className="card">
                <span className="tag">Boilerplate</span>
                <h3>Company description</h3>
                <p>
                  Vortex is a workflow platform that helps teams automate operations and collaborate in real time.
                </p>
              </div>
              <div className="card">
                <span className="tag">Contact</span>
                <h3>Media inquiries</h3>
                <p>For interviews and announcements, reach out via the contact page.</p>
                <a className="btn btn-outline" href="/contact.html" style={{ marginTop: 14 }}>
                  Contact
                </a>
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 18 }}>
                <h2 style={{ fontSize: 34 }}>Announcements</h2>
                <p style={{ fontSize: 16 }}>Example items you can replace with real press releases.</p>
              </div>
              <div className="content-grid">
                <div className="card">
                  <span className="tag">Release</span>
                  <h3>Vortex launches workflow automations</h3>
                  <p>Teams can now reduce manual steps using flexible automation rules.</p>
                  <div className="update-meta">
                    <span>Jan 2026</span>
                    <span className="dot">•</span>
                    <span>Announcement</span>
                  </div>
                </div>
                <div className="card">
                  <span className="tag">Update</span>
                  <h3>Security enhancements</h3>
                  <p>Improved audit logging and access controls to support secure scaling.</p>
                  <div className="update-meta">
                    <span>Dec 2025</span>
                    <span className="dot">•</span>
                    <span>Update</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'pricing.html': {
    title: 'Vortex — Pricing',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Pricing</span>
              </div>
              <h1 className="page-title">Simple pricing that scales</h1>
              <p className="page-subtitle">
                Start free, upgrade when you’re ready, and scale securely with enterprise controls.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/contact.html">
                  Talk to sales
                </a>
                <a className="btn btn-outline" href="/docs.html">
                  Read docs
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>14-day trial</h4>
              <p>No credit card needed. Cancel anytime.</p>
              <span className="tag">Best for teams</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="pricing-grid">
              <div className="card">
                <span className="tag">Starter</span>
                <h3>For individuals & small teams</h3>
                <div className="price">$0</div>
                <div className="muted">Forever</div>
                <ul className="checklist">
                  <li>Spaces & tasks</li>
                  <li>Basic dashboards</li>
                  <li>Comments & activity</li>
                  <li>Community support</li>
                </ul>
                <a className="btn btn-outline" href="/index.html" style={{ marginTop: 16 }}>
                  Get started
                </a>
              </div>
              <div
                className="card"
                style={{ borderColor: 'rgba(37,99,235,0.35)', boxShadow: 'var(--shadow-lg)' }}
              >
                <span className="tag">Pro</span>
                <h3>For growing teams</h3>
                <div className="price">$12</div>
                <div className="muted">Per user / month</div>
                <ul className="checklist">
                  <li>Advanced automations</li>
                  <li>Custom dashboards</li>
                  <li>Integrations</li>
                  <li>Priority support</li>
                </ul>
                <a className="btn btn-primary" href="/contact.html" style={{ marginTop: 16 }}>
                  Start trial
                </a>
              </div>
              <div className="card">
                <span className="tag">Enterprise</span>
                <h3>For secure scale</h3>
                <div className="price">Custom</div>
                <div className="muted">Annual billing</div>
                <ul className="checklist">
                  <li>SSO & advanced access</li>
                  <li>Audit logs</li>
                  <li>Dedicated success</li>
                  <li>Custom SLAs</li>
                </ul>
                <a className="btn btn-outline" href="/contact.html" style={{ marginTop: 16 }}>
                  Contact sales
                </a>
              </div>
            </div>

            <div style={{ marginTop: 56 }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 20 }}>
                <h2 style={{ fontSize: 34 }}>Compare plans</h2>
                <p style={{ fontSize: 16 }}>A quick high-level comparison (dummy content).</p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Starter</th>
                    <th>Pro</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Automations</td>
                    <td>Basic</td>
                    <td>Advanced</td>
                    <td>Advanced + custom</td>
                  </tr>
                  <tr>
                    <td>Integrations</td>
                    <td>Limited</td>
                    <td>Full</td>
                    <td>Full + custom</td>
                  </tr>
                  <tr>
                    <td>Security controls</td>
                    <td>Standard</td>
                    <td>Enhanced</td>
                    <td>SSO, audit, policies</td>
                  </tr>
                  <tr>
                    <td>Support</td>
                    <td>Community</td>
                    <td>Priority</td>
                    <td>Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="page section-gray">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 34 }}>Need help choosing?</h2>
              <p style={{ fontSize: 16 }}>Tell us what you’re building and we’ll recommend a setup.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="/contact.html">
                Contact us
              </a>
              <a className="btn btn-outline" href="/faq.html">
                View FAQ
              </a>
            </div>
          </div>
        </section>
      </>
    )
  },
  'privacy.html': {
    title: 'Vortex — Privacy',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Legal</span>
                <span>›</span>
                <span>Privacy</span>
              </div>
              <h1 className="page-title">Privacy Policy</h1>
              <p className="page-subtitle">Placeholder privacy content. Replace with your actual policy.</p>
            </div>
            <aside className="hero-aside">
              <h4>Related</h4>
              <p>Cookies and security.</p>
              <span className="tag">Legal</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="card">
              <span className="tag">Placeholder</span>
              <h3>What to include</h3>
              <ul className="checklist">
                <li>What data you collect (account, usage, billing)</li>
                <li>How you use data (service delivery, security, support)</li>
                <li>How you share data (processors, integrations)</li>
                <li>Data retention and deletion</li>
                <li>Security measures and user rights</li>
              </ul>
              <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn btn-outline" href="/cookies.html">
                  Cookies
                </a>
                <a className="btn btn-outline" href="/security.html">
                  Security
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'security.html': {
    title: 'Vortex — Security',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Legal</span>
                <span>›</span>
                <span>Security</span>
              </div>
              <h1 className="page-title">Security</h1>
              <p className="page-subtitle">
                How Vortex protects your data (placeholder overview). Replace with your real security details.
              </p>
            </div>
            <aside className="hero-aside">
              <h4>Enterprise</h4>
              <p>Looking for governance controls? See Enterprise.</p>
              <a className="btn btn-outline" href="/enterprise.html" style={{ marginTop: 10 }}>
                Enterprise
              </a>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Access</span>
                <h3>Role-based permissions</h3>
                <p>Control who can view, create, and manage work across spaces.</p>
              </div>
              <div className="card">
                <span className="tag">Audit</span>
                <h3>Auditability</h3>
                <p>Track important changes with activity history and audit trails.</p>
              </div>
              <div className="card">
                <span className="tag">Data</span>
                <h3>Encryption & storage</h3>
                <p>Use secure storage and encryption patterns appropriate for your deployment.</p>
              </div>
              <div className="card">
                <span className="tag">Practices</span>
                <h3>Secure defaults</h3>
                <p>Least privilege, strong authentication, and safe configuration defaults.</p>
              </div>
            </div>

            <div style={{ marginTop: 44 }} className="two-col">
              <div className="card">
                <span className="tag">Policies</span>
                <h3>Where to document</h3>
                <p>Include details like incident response, vendor management, and compliance controls.</p>
                <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="btn btn-outline" href="/privacy.html">
                    Privacy
                  </a>
                  <a className="btn btn-outline" href="/compliance.html">
                    Compliance
                  </a>
                </div>
              </div>
              <div className="card">
                <span className="tag">Support</span>
                <h3>Report an issue</h3>
                <p>If you believe you found a vulnerability, contact us (placeholder).</p>
                <a className="btn btn-primary" href="/contact.html" style={{ marginTop: 14 }}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'startups.html': {
    title: 'Vortex — Startups',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Use cases</span>
                <span>›</span>
                <span>Startups</span>
              </div>
              <h1 className="page-title">Grow from day one</h1>
              <p className="page-subtitle">
                Move fast without losing clarity—standardize processes early and scale without operational chaos.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Start free
                </a>
                <a className="btn btn-outline" href="/guides.html">
                  Onboarding guides
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Startup friendly</h4>
              <p>Great defaults, quick setup, and flexible workflows as you find product-market fit.</p>
              <span className="tag">Move fast</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Templates</span>
                <h3>Repeatable execution</h3>
                <p>Turn “how we do it” into templates so new teammates ramp fast.</p>
              </div>
              <div className="card">
                <span className="tag">Automation</span>
                <h3>Less overhead</h3>
                <p>Automate handoffs and reminders so founders aren’t stuck doing follow-ups.</p>
              </div>
              <div className="card">
                <span className="tag">Dashboards</span>
                <h3>Investor-ready metrics</h3>
                <p>Track outcomes with simple dashboards and share updates with confidence.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'status.html': {
    title: 'Vortex — Status',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Resources</span>
                <span>›</span>
                <span>Status</span>
              </div>
              <h1 className="page-title">Live system updates</h1>
              <p className="page-subtitle">Current status and incident history (dummy content).</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/support.html">
                  Support
                </a>
                <a className="btn btn-outline" href="/help.html">
                  Help center
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Overall status</h4>
              <p>
                <strong style={{ color: 'var(--secondary-color)' }}>Operational</strong> — all systems normal.
              </p>
              <span className="tag">Last updated: Jan 16, 2026</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: 20 }}>
              <h2 style={{ fontSize: 34 }}>Components</h2>
              <p style={{ fontSize: 16 }}>Service-by-service status.</p>
            </div>
            <div className="content-grid">
              <div className="card">
                <span className="tag">API</span>
                <h3>v1 API</h3>
                <p>
                  Status: <strong style={{ color: 'var(--secondary-color)' }}>Operational</strong>
                </p>
              </div>
              <div className="card">
                <span className="tag">Web</span>
                <h3>Dashboard</h3>
                <p>
                  Status: <strong style={{ color: 'var(--secondary-color)' }}>Operational</strong>
                </p>
              </div>
              <div className="card">
                <span className="tag">Jobs</span>
                <h3>Automations</h3>
                <p>
                  Status: <strong style={{ color: 'var(--secondary-color)' }}>Operational</strong>
                </p>
              </div>
              <div className="card">
                <span className="tag">Auth</span>
                <h3>Login &amp; SSO</h3>
                <p>
                  Status: <strong style={{ color: 'var(--secondary-color)' }}>Operational</strong>
                </p>
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: 14 }}>
                <h2 style={{ fontSize: 34 }}>Incident history</h2>
                <p style={{ fontSize: 16 }}>Past updates (dummy entries).</p>
              </div>
              <div className="content-grid">
                <div className="card">
                  <span className="tag">Resolved</span>
                  <h3>Minor latency in automations</h3>
                  <p>Investigated queue saturation and scaled workers. Monitoring ongoing.</p>
                  <div className="update-meta">
                    <span>Jan 2026</span>
                    <span className="dot">•</span>
                    <span>Resolved</span>
                  </div>
                </div>
                <div className="card">
                  <span className="tag">Resolved</span>
                  <h3>Dashboard load time increase</h3>
                  <p>Rolled back a caching change that increased cold-start time.</p>
                  <div className="update-meta">
                    <span>Dec 2025</span>
                    <span className="dot">•</span>
                    <span>Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'support.html': {
    title: 'Vortex — Support',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Support</span>
              </div>
              <h1 className="page-title">How can we help?</h1>
              <p className="page-subtitle">
                Browse help articles, guides, and FAQs—or check live system status. (Dummy support hub.)
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/help.html">
                  Help center
                </a>
                <a className="btn btn-outline" href="/status.html">
                  System status
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Quick links</h4>
              <p>Most teams start with guides and FAQ, then check status if something seems off.</p>
              <span className="tag">Support hub</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Help</span>
                <h3>Help center</h3>
                <p>Troubleshooting, account settings, and common how-tos.</p>
                <a className="btn btn-outline" href="/help.html" style={{ marginTop: 14 }}>
                  Go to help
                </a>
              </div>
              <div className="card">
                <span className="tag">Guides</span>
                <h3>Guides</h3>
                <p>Step-by-step best practices for onboarding and workflows.</p>
                <a className="btn btn-outline" href="/guides.html" style={{ marginTop: 14 }}>
                  Browse guides
                </a>
              </div>
              <div className="card">
                <span className="tag">FAQ</span>
                <h3>FAQ</h3>
                <p>Answers to pricing, billing, and setup questions.</p>
                <a className="btn btn-outline" href="/faq.html" style={{ marginTop: 14 }}>
                  View FAQ
                </a>
              </div>
              <div className="card">
                <span className="tag">Community</span>
                <h3>Forum</h3>
                <p>Ask questions, share templates, and learn from others.</p>
                <a className="btn btn-outline" href="/forum.html" style={{ marginTop: 14 }}>
                  Open forum
                </a>
              </div>
              <div className="card">
                <span className="tag">Status</span>
                <h3>Status</h3>
                <p>Live system updates and incident history.</p>
                <a className="btn btn-outline" href="/status.html" style={{ marginTop: 14 }}>
                  Check status
                </a>
              </div>
              <div className="card">
                <span className="tag">Contact</span>
                <h3>Contact</h3>
                <p>Still stuck? Send a message and we’ll help you out.</p>
                <a className="btn btn-primary" href="/contact.html" style={{ marginTop: 14 }}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'teams.html': {
    title: 'Vortex — Teams',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Use cases</span>
                <span>›</span>
                <span>Teams</span>
              </div>
              <h1 className="page-title">Collaborate and deliver faster</h1>
              <p className="page-subtitle">
                Keep teams aligned with shared spaces, real-time updates, and dashboards that clarify priorities.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pricing.html">
                  Try free
                </a>
                <a className="btn btn-outline" href="/features.html">
                  See features
                </a>
              </div>
            </div>
            <aside className="hero-aside">
              <h4>Great for</h4>
              <p>Operations, product, support, and cross-functional delivery teams.</p>
              <span className="tag">Fast onboarding</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="content-grid">
              <div className="card">
                <span className="tag">Shared spaces</span>
                <h3>One source of truth</h3>
                <p>Organize work by team, project, or initiative with consistent templates.</p>
              </div>
              <div className="card">
                <span className="tag">Dashboards</span>
                <h3>Clarity for every role</h3>
                <p>Operators see tasks; leaders see outcomes—without extra status meetings.</p>
              </div>
              <div className="card">
                <span className="tag">Automation</span>
                <h3>Fewer handoffs</h3>
                <p>Route work to the right owner automatically and keep progress moving.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  },
  'terms.html': {
    title: 'Vortex — Terms',
    render: () => (
      <>
        <section className="page-hero">
          <div className="container">
            <div>
              <div className="breadcrumbs">
                <a href="/index.html">Home</a>
                <span>›</span>
                <span>Legal</span>
                <span>›</span>
                <span>Terms</span>
              </div>
              <h1 className="page-title">Terms of Service</h1>
              <p className="page-subtitle">This page is placeholder legal content. Replace with your actual Terms.</p>
            </div>
            <aside className="hero-aside">
              <h4>Related</h4>
              <p>Privacy and cookies.</p>
              <span className="tag">Legal</span>
            </aside>
          </div>
        </section>

        <section className="page">
          <div className="container">
            <div className="card">
              <span className="tag">Summary</span>
              <h3>Key points (placeholder)</h3>
              <ul className="checklist">
                <li>Use Vortex responsibly and comply with laws.</li>
                <li>Don’t misuse the service or attempt unauthorized access.</li>
                <li>Billing terms depend on your plan.</li>
                <li>Content ownership and IP should be defined here.</li>
              </ul>
              <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn btn-outline" href="/privacy.html">
                  Privacy
                </a>
                <a className="btn btn-outline" href="/cookies.html">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
};

// ─── Homepage component (used by index + Contentstack fallback) ───────────────
export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" id="hero-title">
              Accelerate your team’s workflow
            </h1>
            <p className="hero-subtitle" id="hero-subtitle">
              Modern tools for seamless collaboration.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" id="hero-cta-primary" href="/pricing.html">
                Try free
              </a>
              <a className="btn btn-outline" id="hero-cta-secondary" href="/features.html">
                Explore features
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
            <p id="trusted-by-text">Trusted by teams worldwide</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 id="features-title">Work smarter, move faster</h2>
          </div>
          <div className="features-grid" id="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Automated workflows</h3>
              <p>Reduce manual steps with intelligent automation for daily tasks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Instant collaboration</h3>
              <p>Collaborate in real time with live updates and shared spaces.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Flexible dashboards</h3>
              <p>Customize your view to match your workflow and priorities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Data-driven insights</h3>
              <p>Access detailed analytics to guide better business decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Cloud security</h3>
              <p>Store and access data securely with robust cloud protection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Effortless integrations</h3>
              <p>Connect your essential tools for a seamless workflow.</p>
            </div>
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
              <blockquote id="testimonial-quote">
                &quot;Vortex streamlines our processes, enabling effortless teamwork and faster
                project delivery. Its clean interface and powerful tools keep our team focused
                and efficient.&quot;
              </blockquote>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong id="testimonial-name">Jordan Avery</strong>
                  <span id="testimonial-role">Product Manager</span>
                </div>
              </div>
              <a className="btn btn-primary" id="testimonial-cta" href="/pricing.html">
                Try now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="updates">
        <div className="container">
          <div className="section-header">
            <h2 id="updates-title">Fresh insights. Real impact.</h2>
            <p id="updates-subtitle">
              Browse product updates, guides, and industry news—all in one place.
            </p>
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
            <a
              className="update-card featured"
              data-category="product"
              href="/blog-feature-releases.html"
              aria-label="Read: Recent feature releases"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Recent feature releases cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%232563eb'/><stop offset='1' stop-color='%2310b981'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><circle cx='980' cy='180' r='180' fill='rgba(255,255,255,0.15)'/><circle cx='220' cy='620' r='220' fill='rgba(255,255,255,0.10)'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='64' fill='white' opacity='0.92'>Feature%20Releases</text><text x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='28' fill='white' opacity='0.85'>What%27s%20new%20this%20month</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Product</span>
                <h3>Recent feature releases</h3>
                <p>
                  What’s new this month: workflow automation, dashboards, and faster
                  collaboration.
                </p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </a>

            <a
              className="update-card"
              data-category="guides"
              href="/blog-onboarding-best-practices.html"
              aria-label="Read: Onboarding best practices"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Onboarding best practices cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%23f97316'/><stop offset='1' stop-color='%23f59e0b'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><rect x='120' y='160' width='960' height='480' rx='28' fill='rgba(255,255,255,0.18)'/><circle cx='260' cy='300' r='60' fill='rgba(255,255,255,0.28)'/><path d='M360 300h520' stroke='rgba(255,255,255,0.35)' stroke-width='16' stroke-linecap='round'/><path d='M360 380h620' stroke='rgba(255,255,255,0.30)' stroke-width='16' stroke-linecap='round'/><path d='M360 460h420' stroke='rgba(255,255,255,0.30)' stroke-width='16' stroke-linecap='round'/><text x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='56' fill='white' opacity='0.92'>Onboarding</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Guides</span>
                <h3>Onboarding best practices</h3>
                <p>
                  Get your org productive quickly with roles, defaults, and a clean first
                  sprint.
                </p>
                <div className="update-meta">
                  <span>Dec 2025</span>
                  <span className="dot">•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </a>

            <a
              className="update-card"
              data-category="insights"
              href="/blog-saas-trends.html"
              aria-label="Read: Industry trends: what's next in SaaS"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Industry trends cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='1200' height='800' fill='%230ea5e9'/><path d='M160 560c120-120 240-80 320-160 80-80 160-200 280-200 120 0 200 100 280 140' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='16' stroke-linecap='round'/><circle cx='240' cy='520' r='16' fill='rgba(255,255,255,0.75)'/><circle cx='480' cy='400' r='16' fill='rgba(255,255,255,0.75)'/><circle cx='760' cy='260' r='16' fill='rgba(255,255,255,0.75)'/><circle cx='1000' cy='340' r='16' fill='rgba(255,255,255,0.75)'/><text x='50%25' y='70%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='56' fill='white' opacity='0.92'>Insights</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Insights</span>
                <h3>Industry trends: what&apos;s next in SaaS</h3>
                <p>
                  How modern teams are evolving delivery with secure-by-default workflows.
                </p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>9 min read</span>
                </div>
              </div>
            </a>

            <a
              className="update-card"
              data-category="product"
              href="/blog-security-update-overview.html"
              aria-label="Read: Security update overview"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Security update overview cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%231d4ed8'/><stop offset='1' stop-color='%230ea5e9'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><path d='M600 220c140 0 260 60 260 60v180c0 160-120 260-260 320-140-60-260-160-260-320V280s120-60 260-60z' fill='rgba(255,255,255,0.18)'/><path d='M600 340c60 0 110 50 110 110 0 70-50 120-110 120s-110-50-110-120c0-60 50-110 110-110z' fill='rgba(255,255,255,0.22)'/><rect x='565' y='410' width='70' height='120' rx='18' fill='rgba(255,255,255,0.30)'/><text x='50%25' y='72%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='56' fill='white' opacity='0.92'>Security</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Product</span>
                <h3>Security update overview</h3>
                <p>
                  Audit logs, access controls, and best practices for scaling securely.
                </p>
                <div className="update-meta">
                  <span>Jan 2026</span>
                  <span className="dot">•</span>
                  <span>4 min read</span>
                </div>
              </div>
            </a>

            <a
              className="update-card"
              data-category="guides"
              href="/blog-workspace-customization.html"
              aria-label="Read: Customize your workspace"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Customize your workspace cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%23ef4444'/><stop offset='1' stop-color='%23f97316'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><rect x='120' y='160' width='960' height='480' rx='28' fill='rgba(255,255,255,0.18)'/><rect x='180' y='220' width='260' height='360' rx='18' fill='rgba(255,255,255,0.14)'/><rect x='470' y='220' width='550' height='160' rx='18' fill='rgba(255,255,255,0.14)'/><rect x='470' y='410' width='550' height='170' rx='18' fill='rgba(255,255,255,0.14)'/><text x='50%25' y='72%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='56' fill='white' opacity='0.92'>Workspace</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Guides</span>
                <h3>Customize your workspace</h3>
                <p>
                  Personalize views, saved filters, and dashboards so every team sees what
                  they need.
                </p>
                <div className="update-meta">
                  <span>Oct 2025</span>
                  <span className="dot">•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </a>

            <a
              className="update-card"
              data-category="insights"
              href="/blog-weekly-roundup.html"
              aria-label="Read: Weekly update roundup"
            >
              <div className="update-image">
                <img
                  loading="lazy"
                  alt="Weekly roundup cover"
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%23667eea'/><stop offset='1' stop-color='%23764ba2'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><rect x='170' y='170' width='860' height='460' rx='28' fill='rgba(255,255,255,0.18)'/><path d='M260 280h680' stroke='rgba(255,255,255,0.45)' stroke-width='14' stroke-linecap='round'/><path d='M260 360h580' stroke='rgba(255,255,255,0.35)' stroke-width='12' stroke-linecap='round'/><path d='M260 440h640' stroke='rgba(255,255,255,0.35)' stroke-width='12' stroke-linecap='round'/><path d='M260 520h520' stroke='rgba(255,255,255,0.35)' stroke-width='12' stroke-linecap='round'/><text x='50%25' y='72%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='56' fill='white' opacity='0.92'>Roundup</text></svg>"
                />
              </div>
              <div className="update-content">
                <span className="update-category">Insights</span>
                <h3>Weekly update roundup</h3>
                <p>
                  Recent changes at a glance—what’s improved and what’s coming next.
                </p>
                <div className="update-meta">
                  <span>Nov 2025</span>
                  <span className="dot">•</span>
                  <span>4 min read</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Product gallery at a glance</h2>
            <p>Explore recent projects in a simple grid</p>
          </div>
          <div className="gallery-grid">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="gallery-item">
                <div className="gallery-placeholder" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Work smarter. Scale faster.</h2>
            <p>Automate HR tasks and empower your team with intuitive, modern tools.</p>
            <button className="btn btn-primary btn-large" type="button">
              Try free
            </button>
            <p className="cta-note">No credit card needed. 14-day free trial.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function StubPage({ title }: { title: string }) {
  return (
    <section className="page">
      <div className="container">
        <div className="card">
          <span className="tag">Porting in progress</span>
          <h1 style={{ fontSize: 34, letterSpacing: '-1px', marginBottom: 12 }}>{title}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            This page is next in the conversion queue (static HTML → real Next.js JSX).
          </p>
        </div>
      </div>
    </section>
  );
}

