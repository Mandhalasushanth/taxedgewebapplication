import { env } from '@core/config'

import { paymentsApi } from '../api/paymentsApi'
import type { PaymentsFilters, PaymentsItem } from '../types/payments.types'

export const paymentsService = {
  async list(filters?: PaymentsFilters): Promise<PaymentsItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return []
    }
    const response = await paymentsApi.list(filters)
    return response.data
  },
}
