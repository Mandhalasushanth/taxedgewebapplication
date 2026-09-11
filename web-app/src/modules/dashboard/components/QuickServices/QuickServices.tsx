import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAuthStore } from '@store/index'
import './QuickServices.css'

export interface QuickServiceItem {
  id: string
  label: string
  description: string
  to: string
  iconType: 'gst' | 'itr' | 'loans' | 'insurance' | 'company' | 'more'
}

const QUICK_SERVICE_LIST: QuickServiceItem[] = [
  {
    id: 'gst',
    label: 'GST',
    description: 'Registration, Filing & Compliance',
    to: routePaths.gst.root,
    iconType: 'gst',
  },
  {
    id: 'itr',
    label: 'ITR & TDS',
    description: 'File Returns Claim Refund',
    to: routePaths.itr.root,
    iconType: 'itr',
  },
  {
    id: 'loans',
    label: 'Loans',
    description: 'Business & Personal Loans',
    to: routePaths.loans,
    iconType: 'loans',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    description: 'Protect What Matters',
    to: routePaths.insurance,
    iconType: 'insurance',
  },
  {
    id: 'company',
    label: 'Company Services',
    description: 'Registration & Compliance',
    to: routePaths.services,
    iconType: 'company',
  },
  {
    id: 'more',
    label: 'More Services',
    description: 'Explore All Services',
    to: routePaths.services,
    iconType: 'more',
  },
]

const ChevronRightIcon = () => (
  <svg className="quick-service__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const renderServiceIcon = (type: QuickServiceItem['iconType']) => {
  switch (type) {
    case 'gst':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--gst">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      )
    case 'itr':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--itr">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="12" y2="15" />
        </svg>
      )
    case 'loans':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--loans">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9.01" y2="6" />
          <line x1="15" y1="6" x2="15.01" y2="6" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
          <line x1="9" y1="14" x2="9.01" y2="14" />
          <line x1="15" y1="14" x2="15.01" y2="14" />
          <path d="M10 18h4" />
        </svg>
      )
    case 'insurance':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--insurance">
          <path d="M12 22v-6" />
          <path d="M12 16a2 2 0 0 1-2-2" />
          <path d="M20.8 13.5A9 9 0 0 0 3.2 13.5a1 1 0 0 0 .8 1.5h16a1 1 0 0 0 .8-1.5z" />
        </svg>
      )
    case 'company':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--company">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="3" height="3" />
          <rect x="13" y="8" width="3" height="3" />
          <rect x="8" y="13" width="3" height="3" />
          <rect x="13" y="13" width="3" height="3" />
        </svg>
      )
    case 'more':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-service__svg quick-service__svg--more">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
  }
}

export interface QuickServicesProps {
  services?: QuickServiceItem[]
}

export const QuickServices = ({ services = QUICK_SERVICE_LIST }: QuickServicesProps) => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const handleServiceClick = (e: MouseEvent, targetUrl: string) => {
    e.preventDefault()
    if (!user?.isProfileComplete) {
      navigate(routePaths.auth.createProfile, { state: { returnTo: targetUrl } })
    } else {
      navigate(targetUrl)
    }
  }

  return (
    <section className="quick-services" id="quick-services">
      {/* Section Header */}
      <div className="quick-services__header">
        <div className="quick-services__header-left">
          <h2 className="quick-services__title">Quick Services</h2>
          <p className="quick-services__subtitle">Get started with our most popular services</p>
        </div>

        <Link className="quick-services__view-all" to={routePaths.services}>
          <span>View All Services</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* 6 Cards Grid */}
      <div className="quick-services__grid">
        {services.map((service) => (
          <a
            className="quick-service"
            key={service.id}
            href={service.to}
            onClick={(e) => handleServiceClick(e, service.to)}
          >
            <div className="quick-service__top-row">
              <div className={`quick-service__icon-wrap quick-service__icon-wrap--${service.iconType}`}>
                {renderServiceIcon(service.iconType)}
              </div>
              <ChevronRightIcon />
            </div>

            <h3 className="quick-service__label">{service.label}</h3>
            <p className="quick-service__description">{service.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default QuickServices

