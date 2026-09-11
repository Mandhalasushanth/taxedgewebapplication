import { env } from '@core/config'

import { insuranceApi } from '../api/insuranceApi'
import type { InsuranceFilters, InsuranceItem } from '../types/insurance.types'

export const insuranceService = {
  async list(filters?: InsuranceFilters): Promise<InsuranceItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return []
    }
    const response = await insuranceApi.list(filters)
    return response.data
  },
}
