export function SiteNavbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <a className="logo" href="/index.html" aria-label="Vortex home">
            <img
              className="logo-mark"
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              aria-hidden="true"
            />
            <span className="logo-text">Vortex</span>
          </a>

          <ul className="nav-menu">
            <li className="nav-item dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Explore
              </button>
              <div className="dropdown-content">
                <div className="dropdown-column">
                  <h4>Product</h4>
                  <a href="/overview.html">Overview</a>
                  <a href="/features.html">Features</a>
                  <a href="/integrations.html">Integrations</a>
                </div>
                <div className="dropdown-column">
                  <h4>Use cases</h4>
                  <a href="/teams.html">Teams</a>
                  <a href="/startups.html">Startups</a>
                  <a href="/enterprise.html">Enterprise</a>
                </div>
                <div className="dropdown-column">
                  <h4>Resources</h4>
                  <a href="/docs.html">Docs</a>
                  <a href="/community.html">Community</a>
                  <a href="/status.html">Status</a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a href="/about.html" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/blog.html" className="nav-link">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a href="/support.html" className="nav-link">
                Support
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <a className="btn btn-secondary" href="/pricing.html">
              Get started
            </a>
          </div>

          <button className="mobile-menu-toggle" aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

