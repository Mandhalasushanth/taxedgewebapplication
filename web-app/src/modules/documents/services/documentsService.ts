import { env } from '@core/config'

import { documentsApi } from '../api/documentsApi'
import type { DocumentsFilters, DocumentsItem } from '../types/documents.types'

export const documentsService = {
  async list(filters?: DocumentsFilters): Promise<DocumentsItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return []
    }
    const response = await documentsApi.list(filters)
    return response.data
  },
}
