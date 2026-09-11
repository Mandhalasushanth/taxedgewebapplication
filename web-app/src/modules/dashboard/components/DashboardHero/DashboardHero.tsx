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

const getFormattedDate = (): string => {
  const now = new Date()
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const dayNum = now.getDate()
  const monthName = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const year = now.getFullYear()
  return `${dayName}, ${dayNum} ${monthName}, ${year}`
}

export const DashboardHero = ({ userName }: DashboardHeroProps) => {
  const firstName = userName ? userName.split(' ')[0] : 'Sagarika'

  return (
    <section className="dashboard-hero" aria-label="TaxEdge Overview Banner">
      {/* Left Column: Date, Greeting, Heading, Subtext & Actions */}
      <div className="dashboard-hero__left">
        <span className="dashboard-hero__date-badge">
          {getFormattedDate()}
        </span>
        
        <h1 className="dashboard-hero__greeting">
          {getGreeting()}, {firstName} <span className="dashboard-hero__wave">👋</span>
        </h1>

        <h2 className="dashboard-hero__question">
          What can we help you with today?
        </h2>
        
        <p className="dashboard-hero__subtext">
          File returns, manage compliance, track applications and more – all in one place.
        </p>

        <div className="dashboard-hero__actions">
          <Link className="dashboard-hero__btn dashboard-hero__btn--primary" to={routePaths.gst.filing}>
            <span>File GST return</span>
            <span aria-hidden="true">→</span>
          </Link>

          <a className="dashboard-hero__btn dashboard-hero__btn--secondary" href="#quick-services">
            <span>Browse services</span>
          </a>
        </div>
      </div>

      {/* Center Column: 3D Tax Illustration (Image 2) */}
      <div className="dashboard-hero__center">
        <img
          src="/assets/images/tax-journey-illustration.png"
          alt="Tax Filing Illustration"
          className="dashboard-hero__tax-img"
        />
      </div>

      {/* Right Column: Slogan Quote with Underline Accent */}
      <div className="dashboard-hero__right">
        <div className="dashboard-hero__quote-block">
          <p className="dashboard-hero__quote-text">
            &ldquo;Simplifying<br />
            Taxes for a<br />
            Brighter Tomorrow&rdquo;
          </p>
          <div className="dashboard-hero__quote-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

