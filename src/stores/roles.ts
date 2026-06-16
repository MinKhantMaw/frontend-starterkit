import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { rolesApi, type RolePayload } from '@/api/roles'
import type { PaginationMeta, QueryParams, Role } from '@/types'

export const useRoleStore = defineStore('roles', {
  state: () => ({
    roles: [] as Role[],
    current: null as Role | null,
    meta: null as PaginationMeta | null,
    loading: false,
  }),
  actions: {
    async fetchRoles(params: QueryParams = {}) {
      this.loading = true
      try {
        const response = await rolesApi.list(params)
        this.roles = response.data
        this.meta = response.meta ?? null
      } finally {
        this.loading = false
      }
    },
    async fetchRole(id: string | number) {
      this.loading = true
      try {
        this.current = await rolesApi.get(id)
      } finally {
        this.loading = false
      }
    },
    async createRole(payload: RolePayload) {
      const role = await rolesApi.create(payload)
      await rolesApi.assignPermissions(role.id, payload.permissions)
      ElMessage.success('Role created')
    },
    async updateRole(id: string | number, payload: RolePayload) {
      await rolesApi.update(id, payload)
      await rolesApi.assignPermissions(id, payload.permissions)
      ElMessage.success('Role updated')
    },
    async deleteRole(id: string | number) {
      await rolesApi.remove(id)
      ElMessage.success('Role deleted')
    },
  },
})
