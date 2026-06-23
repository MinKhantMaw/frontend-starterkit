import { defineStore } from 'pinia'
import { permissionService } from './service'
import type { PaginationMeta } from '@/types/api'
import type { PermissionFilters, PermissionRecord } from '@/modules/permissions/types'

export const usePermissionStore = defineStore('permissions', {
  state: () => ({
    items: [] as PermissionRecord[],
    meta: { page: 1, perPage: 50, total: 0 } as PaginationMeta,
    loading: false,
  }),
  getters: {
    grouped: (state): Record<string, PermissionRecord[]> =>
      state.items.reduce<Record<string, PermissionRecord[]>>((groups, permission) => {
        groups[permission.module] = groups[permission.module] || []
        groups[permission.module].push(permission)
        return groups
      }, {}),
  },
  actions: {
    async fetchPermissions(params: PermissionFilters = {}): Promise<void> {
      this.loading = true
      try {
        const response = await permissionService.list(params)
        this.items = response.data
        this.meta = response.meta
      } finally {
        this.loading = false
      }
    },
  },
})
