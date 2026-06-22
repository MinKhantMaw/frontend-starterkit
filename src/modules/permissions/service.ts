import api from '@/libs/http'
import type { Permission } from '@/libs/types'

type PermissionListResponse =
  | Permission[]
  | { data?: Permission[]; permissions?: Permission[]; items?: Permission[] }
  | { data?: { items?: Permission[] } }

export const permissionsApi = {
  async list() {
    const { data } = await api.get<PermissionListResponse>('/permissions')

    if (Array.isArray(data)) {
      return data
    }

    if ('items' in data && Array.isArray(data.items)) {
      return data.items
    }

    if ('data' in data && Array.isArray(data.data)) {
      return data.data
    }

    if ('permissions' in data && Array.isArray(data.permissions)) {
      return data.permissions
    }

    if ('data' in data && data.data && typeof data.data === 'object' && Array.isArray((data.data as { items?: Permission[] }).items)) {
      return (data.data as { items?: Permission[] }).items
    }

    return []
  },
}
