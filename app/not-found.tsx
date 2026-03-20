export default function NotFound() {
  return (
    <section className="page">
      <div className="container">
        <div className="card">
          <span className="tag">404</span>
          <h1 style={{ fontSize: 34, letterSpacing: '-1px', marginBottom: 12 }}>
            This page could not be found.
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
            Check the URL or go back to the homepage.
          </p>
          <a className="btn btn-primary" href="/index.html">
            Go home
          </a>
        </div>
      </div>
    </section>
  );
}

