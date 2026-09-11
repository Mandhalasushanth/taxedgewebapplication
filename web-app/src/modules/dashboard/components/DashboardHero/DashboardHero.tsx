import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { DashboardBrief } from '../../types/dashboard.types'
import './DashboardHero.css'

export interface DashboardHeroProps {
  userName: string
  brief?: DashboardBrief
}

const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const DocBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="dashboard-hero__badge-svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

const ShieldBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="dashboard-hero__badge-svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

export const DashboardHero = ({ userName }: DashboardHeroProps) => {
  const firstName = userName ? userName.split(' ')[0] : 'Sagarika'

  return (
    <section className="dashboard-hero" aria-label="Welcome Banner">
      {/* Background radial glows */}
      <div className="dashboard-hero__glow-bg" aria-hidden="true" />

      {/* Left Column: Greeting & Actions */}
      <div className="dashboard-hero__left">
        <span className="dashboard-hero__pill">Welcome to TaxEdge</span>
        
        <h1 className="dashboard-hero__greeting">
          {getGreeting()}, {firstName} <span className="dashboard-hero__wave">👋</span>
        </h1>
        
        <p className="dashboard-hero__subtext">
          Let&apos;s simplify your tax and financial journey.
        </p>

        <div className="dashboard-hero__actions">
          <a className="dashboard-hero__btn dashboard-hero__btn--primary" href="#quick-services">
            <span>Explore Services</span>
            <span aria-hidden="true">→</span>
          </a>

          <Link className="dashboard-hero__btn dashboard-hero__btn--secondary" to={routePaths.gst.filing}>
            <span>File GST Return</span>
          </Link>
        </div>
      </div>

      {/* Center Column: Advisor image with floating badges */}
      <div className="dashboard-hero__center">
        <div className="dashboard-hero__advisor-wrap">
          <img
            src="/assets/images/dashboard-advisor.jpg"
            alt="TaxEdge Financial Advisor"
            className="dashboard-hero__advisor-img"
          />

          {/* Floating Document Badge */}
          <div className="dashboard-hero__floating-badge dashboard-hero__floating-badge--doc" title="Smart Tax Filing">
            <DocBadgeIcon />
          </div>

          {/* Floating Security Badge */}
          <div className="dashboard-hero__floating-badge dashboard-hero__floating-badge--shield" title="Verified & Secure">
            <ShieldBadgeIcon />
          </div>
        </div>
      </div>

      {/* Right Column: Slogan with underline */}
      <div className="dashboard-hero__right">
        <div className="dashboard-hero__tag-block">
          <span className="dashboard-hero__tag-lead">Your</span>
          <span className="dashboard-hero__tag-main">Trusted Partner</span>
          <span className="dashboard-hero__tag-lead">for Tax &amp; Finance</span>
          <div className="dashboard-hero__tag-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
