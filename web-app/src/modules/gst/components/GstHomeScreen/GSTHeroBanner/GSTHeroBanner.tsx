import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import './GSTHeroBanner.css'

export const GSTHeroBanner = () => {
  return (
    <section className="gst-hero-banner" aria-labelledby="gst-hero-title">
      <div className="gst-hero-banner__header">
        <span className="gst-hero-banner__badge">TAXEDGE GST SUITE</span>
        <h1 id="gst-hero-title" className="gst-hero-banner__title">
          Goods &amp; Services Tax
        </h1>
        <p className="gst-hero-banner__description">
          Registration through to annual compliance, handled by your dedicated GST executive.
          Track your active filings, manage compliance, or start a new GST application.
        </p>
      </div>

      <div className="gst-hero-banner__actions">
        <Link
          to={routePaths.gst.registration}
          className="gst-hero-banner__btn gst-hero-banner__btn--primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gst-hero-banner__btn-icon">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>New GST Registration</span>
        </Link>

        <Link
          to={routePaths.gst.filing}
          className="gst-hero-banner__btn gst-hero-banner__btn--secondary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-hero-banner__btn-icon">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M9 15l2 2 4-4" />
          </svg>
          <span>File GSTR Returns</span>
        </Link>

        <Link
          to={routePaths.gst.track()}
          className="gst-hero-banner__btn gst-hero-banner__btn--outline"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-hero-banner__btn-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 14 14" />
          </svg>
          <span>Track Application</span>
        </Link>
      </div>

      <div className="gst-hero-banner__features">
        <div className="gst-hero-feature-item">
          <span className="gst-hero-feature-dot"></span>
          <span>Verified CA Assistance</span>
        </div>
        <div className="gst-hero-feature-item">
          <span className="gst-hero-feature-dot"></span>
          <span>100% Digital &amp; Paperless</span>
        </div>
        <div className="gst-hero-feature-item">
          <span className="gst-hero-feature-dot"></span>
          <span>Guaranteed Due Date Compliance</span>
        </div>
      </div>
    </section>
  )
}
