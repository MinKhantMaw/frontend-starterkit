import { defineStore } from 'pinia'
import { permissionsApi } from '@/modules/permissions/service'
import type { Permission } from '@/libs/types'
import { groupPermissionName } from '@/libs/permissions'

export const usePermissionStore = defineStore('permissions', {
  state: () => ({
    permissions: [] as Permission[],
    loading: false,
  }),
  getters: {
    grouped: (state) =>
      state.permissions.reduce<Record<string, Permission[]>>((groups, permission) => {
        const module = permission.module || groupPermissionName(permission.name)
        groups[module] = groups[module] ?? []
        groups[module].push(permission)
        return groups
      }, {}),
  },
  actions: {
    async fetchPermissions() {
      this.loading = true
      try {
        this.permissions = await permissionsApi.list() ?? []
      } finally {
        this.loading = false
      }
    },
  },
})
