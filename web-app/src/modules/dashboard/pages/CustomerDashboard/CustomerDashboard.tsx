import { EmptyState, Loader } from '@shared/components'
import { useAuthStore } from '@store/index'
import {
  DashboardHero,
  QuickServices,
  DashboardOverviewGrid,
} from '../../components'
import { useDashboardSummary } from '../../hooks/useDashboardSummary'
import './CustomerDashboard.css'

export const CustomerDashboard = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading, error } = useDashboardSummary()

  if (isLoading) return <Loader fullPage label="Loading your dashboard" />
  if (error || !data) {
    return <EmptyState title="We could not load your dashboard" description={error ?? undefined} />
  }

  return (
    <div className="dashboard">
      {/* 1. Hero Banner */}
      <DashboardHero userName={user?.fullName || 'Sagarika'} brief={data.brief} />

      {/* 2. Quick Services */}
      <QuickServices />

      {/* 3. 2x2 Overview Grid */}
      <DashboardOverviewGrid
        applications={data.recentApplications}
        pendingTasks={data.pendingTasks}
        deadlines={data.upcomingDeadlinesList}
      />
    </div>
  )
}

export default CustomerDashboard

