import api from '@/api/http'
import { PERMISSIONS } from '@/constants/permissions'
import type { PaginatedResponse } from '@/types/api'
import type { PermissionFilters, PermissionRecord } from '@/modules/permissions/types'

const permissions: PermissionRecord[] = Object.values(PERMISSIONS).map((name, index) => ({
  id: index + 1,
  name,
  module: name.split('.')[0],
}))

export const permissionService = {
  async list(params: PermissionFilters = {}): Promise<PaginatedResponse<PermissionRecord>> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<PaginatedResponse<PermissionRecord>>('/permissions', { params })
      return data
    }

    const search = params.search?.toLowerCase()
    const data = search ? permissions.filter((permission) => permission.name.toLowerCase().includes(search)) : permissions
    return { data, meta: { page: 1, perPage: 50, total: data.length } }
  },
}
