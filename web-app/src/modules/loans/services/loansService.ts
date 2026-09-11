import { env } from '@core/config'

import { loansApi } from '../api/loansApi'
import type { LoansFilters, LoansItem } from '../types/loans.types'

export const loansService = {
  async list(filters?: LoansFilters): Promise<LoansItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return []
    }
    const response = await loansApi.list(filters)
    return response.data
  },
}
