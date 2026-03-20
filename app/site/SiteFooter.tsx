export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="/overview.html">Overview</a>
              </li>
              <li>
                <a href="/features.html">Features</a>
              </li>
              <li>
                <a href="/pricing.html">Pricing</a>
              </li>
              <li>
                <a href="/docs.html">Docs</a>
              </li>
              <li>
                <a href="/api.html">API</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/about.html">About</a>
              </li>
              <li>
                <a href="/careers.html">Careers</a>
              </li>
              <li>
                <a href="/blog.html">Blog</a>
              </li>
              <li>
                <a href="/press.html">Press</a>
              </li>
              <li>
                <a href="/contact.html">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/help.html">Help</a>
              </li>
              <li>
                <a href="/status.html">Status</a>
              </li>
              <li>
                <a href="/guides.html">Guides</a>
              </li>
              <li>
                <a href="/faq.html">FAQ</a>
              </li>
              <li>
                <a href="/forum.html">Forum</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/terms.html">Terms</a>
              </li>
              <li>
                <a href="/privacy.html">Privacy</a>
              </li>
              <li>
                <a href="/cookies.html">Cookies</a>
              </li>
              <li>
                <a href="/security.html">Security</a>
              </li>
              <li>
                <a href="/compliance.html">Compliance</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <span>Vortex</span>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="X">
              X
            </a>
            <a href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="#" aria-label="YouTube">
              YouTube
            </a>
          </div>
          <p className="footer-copyright">
            All rights reserved © <span id="year">2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

