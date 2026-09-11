import { env } from '@core/config'
import { userStorage } from '@core/storage/userStorage'

import { applicationsApi } from '../api/applicationsApi'
import type { ApplicationsFilters, ApplicationsItem } from '../types/applications.types'

export const applicationsService = {
  async list(filters?: ApplicationsFilters): Promise<ApplicationsItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const userApps = userStorage.getUserApplications()
      return userApps.map((a) => ({
        id: a.id,
        reference: a.code,
        title: a.title,
        status: (a.statusLabel.toUpperCase().replace(/\s+/g, '_') as any) || 'SUBMITTED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
    }
    const response = await applicationsApi.list(filters)
    return response.data
  },
}
