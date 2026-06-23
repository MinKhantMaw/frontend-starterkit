import { defineStore } from 'pinia'
import { roleService } from './service'
import { notifySuccess } from '@/utils/notify'
import type { PaginationMeta } from '@/types/api'
import type { Role, RoleFilters, RolePayload } from '@/modules/roles/types'

export const useRoleStore = defineStore('roles', {
  state: () => ({
    items: [] as Role[],
    current: null as Role | null | undefined,
    meta: { page: 1, perPage: 10, total: 0 } as PaginationMeta,
    loading: false,
    saving: false,
    error: '' as string,
  }),
  actions: {
    async fetchRoles(params: RoleFilters = {}): Promise<void> {
      this.loading = true
      try {
        const response = await roleService.list(params)
        this.items = response.data
        this.meta = response.meta
      } finally {
        this.loading = false
      }
    },
    async fetchRole(id: string | number): Promise<void> {
      this.loading = true
      try {
        this.current = await roleService.find(id)
      } finally {
        this.loading = false
      }
    },
    async createRole(payload: RolePayload): Promise<void> {
      this.saving = true
      try {
        await roleService.create(payload)
        notifySuccess('Role created')
      } finally {
        this.saving = false
      }
    },
    async updateRole(id: string | number, payload: Partial<RolePayload>): Promise<void> {
      this.saving = true
      try {
        this.current = await roleService.update(id, payload)
        notifySuccess('Role updated')
      } finally {
        this.saving = false
      }
    },
    async deleteRole(id: string | number): Promise<void> {
      await roleService.remove(id)
      notifySuccess('Role deleted')
    },
  },
})
