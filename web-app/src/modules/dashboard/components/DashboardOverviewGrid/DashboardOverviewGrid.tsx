import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { RecentApplication, PendingTask, UpcomingDeadlineItem } from '../../types/dashboard.types'
import './DashboardOverviewGrid.css'

export interface DashboardOverviewGridProps {
  applications?: RecentApplication[]
  pendingTasks?: PendingTask[]
  deadlines?: UpcomingDeadlineItem[]
}

// Icons for Card Headers
const HeaderDocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overview-card__header-svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

const HeaderClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overview-card__header-svg">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const HeaderCalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overview-card__header-svg">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const HeaderActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overview-card__header-svg">
    <path d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="9" />
  </svg>
)

// Inner Empty State Icons
const EmptyDocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="overview-card__empty-svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const EmptyCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="overview-card__empty-svg">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)

const EmptyCalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="overview-card__empty-svg">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="12" cy="15" r="1.5" />
  </svg>
)

const EmptyClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="overview-card__empty-svg">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 15 15" />
  </svg>
)

export const DashboardOverviewGrid = ({
  applications = [],
  pendingTasks = [],
  deadlines = [],
}: DashboardOverviewGridProps) => {
  return (
    <section className="dashboard-overview-grid" aria-label="Dashboard Overview">
      {/* 1. My Applications */}
      <div className="overview-card">
        <div className="overview-card__header">
          <div className="overview-card__header-left">
            <div className="overview-card__header-icon-wrap">
              <HeaderDocIcon />
            </div>
            <div>
              <h3 className="overview-card__title">My Applications</h3>
              <p className="overview-card__subtitle">Track and manage all your applications</p>
            </div>
          </div>
          <Link className="overview-card__view-all" to={routePaths.applications}>
            <span>View All</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="overview-card__body">
          {applications.length > 0 ? (
            <div className="overview-card__list">
              {applications.slice(0, 3).map((app) => (
                <Link key={app.id} to={app.to} className="overview-card__item">
                  <div className="overview-card__item-left">
                    <span className="overview-card__item-title">{app.title}</span>
                    <span className="overview-card__item-meta">{app.code} · {app.meta}</span>
                  </div>
                  <span className={`overview-card__badge overview-card__badge--${app.statusTone}`}>
                    {app.statusLabel}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="overview-card__empty-box">
              <div className="overview-card__empty-icon-wrap">
                <EmptyDocIcon />
              </div>
              <h4 className="overview-card__empty-title">You haven&apos;t started any applications yet</h4>
              <p className="overview-card__empty-desc">
                Explore our services and get started with your tax and financial journey today.
              </p>
              <a href="#quick-services" className="overview-card__empty-btn">
                <span>Browse Services</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 2. Pending Actions */}
      <div className="overview-card">
        <div className="overview-card__header">
          <div className="overview-card__header-left">
            <div className="overview-card__header-icon-wrap">
              <HeaderClockIcon />
            </div>
            <div>
              <h3 className="overview-card__title">Pending Actions</h3>
              <p className="overview-card__subtitle">Complete these to proceed with your applications</p>
            </div>
          </div>
        </div>

        <div className="overview-card__body">
          {pendingTasks.length > 0 ? (
            <div className="overview-card__list">
              {pendingTasks.map((task) => (
                <div key={task.id} className="overview-card__item">
                  <div className="overview-card__item-left">
                    <span className="overview-card__item-title">{task.title}</span>
                    <span className="overview-card__item-meta">{task.meta}</span>
                  </div>
                  <Link to={task.actionTo} className="overview-card__btn-action">
                    {task.actionLabel}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="overview-card__empty-box">
              <div className="overview-card__empty-icon-wrap">
                <EmptyCheckIcon />
              </div>
              <h4 className="overview-card__empty-title">You&apos;re all caught up!</h4>
              <p className="overview-card__empty-desc">
                No pending actions at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Upcoming Deadlines */}
      <div className="overview-card">
        <div className="overview-card__header">
          <div className="overview-card__header-left">
            <div className="overview-card__header-icon-wrap">
              <HeaderCalendarIcon />
            </div>
            <div>
              <h3 className="overview-card__title">Upcoming Deadlines</h3>
              <p className="overview-card__subtitle">Stay ahead with important tax dates</p>
            </div>
          </div>
        </div>

        <div className="overview-card__body">
          {deadlines.length > 0 ? (
            <div className="overview-card__list">
              {deadlines.map((d) => (
                <div key={d.id} className="overview-card__item">
                  <div className="overview-card__item-left">
                    <span className="overview-card__item-title">{d.title}</span>
                    <span className="overview-card__item-meta">{d.dueLabel}</span>
                  </div>
                  <span className={`overview-card__badge overview-card__badge--${d.daysTone}`}>
                    {d.daysText}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="overview-card__empty-box">
              <div className="overview-card__empty-icon-wrap">
                <EmptyCalendarIcon />
              </div>
              <h4 className="overview-card__empty-title">No upcoming deadlines</h4>
              <p className="overview-card__empty-desc">
                Your relevant tax deadlines will appear here based on your services and applications.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Recent Activity */}
      <div className="overview-card">
        <div className="overview-card__header">
          <div className="overview-card__header-left">
            <div className="overview-card__header-icon-wrap">
              <HeaderActivityIcon />
            </div>
            <div>
              <h3 className="overview-card__title">Recent Activity</h3>
              <p className="overview-card__subtitle">Your latest activity on TaxEdge</p>
            </div>
          </div>
        </div>

        <div className="overview-card__body">
          <div className="overview-card__empty-box">
            <div className="overview-card__empty-icon-wrap">
              <EmptyClockIcon />
            </div>
            <h4 className="overview-card__empty-title">No recent activity</h4>
            <p className="overview-card__empty-desc">
              Your latest actions and updates will be shown here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardOverviewGrid
