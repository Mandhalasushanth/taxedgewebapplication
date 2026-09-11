import { env } from '@core/config'

import { itrApi } from '../api/itrApi'
import type { ItrFilters, ItrItem } from '../types/itr.types'

export const itrService = {
  async list(filters?: ItrFilters): Promise<ItrItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return []
    }
    const response = await itrApi.list(filters)
    return response.data
  },
}
