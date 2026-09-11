import { localStore } from './localStorage'
import type { RecentApplication } from '@modules/dashboard/types/dashboard.types'

const USER_APPLICATIONS_KEY = 'taxedge.userApplications'

export const userStorage = {
  getUserApplications(): RecentApplication[] {
    return localStore.get<RecentApplication[]>(USER_APPLICATIONS_KEY) || []
  },

  saveUserApplication(app: RecentApplication): void {
    const apps = this.getUserApplications()
    const index = apps.findIndex((a) => a.id === app.id)
    if (index >= 0) {
      apps[index] = app
    } else {
      apps.unshift(app)
    }
    localStore.set(USER_APPLICATIONS_KEY, apps)
  },

  clearUserApplications(): void {
    localStore.remove(USER_APPLICATIONS_KEY)
  },
}
