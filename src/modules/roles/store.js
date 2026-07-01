import { defineStore } from 'pinia'
import { roleService } from './service.js'
import { notifySuccess } from '@/utils/notify'

const defaultMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
}

function unwrapData(response) {
  return response?.data?.data ?? {}
}

function normalizeMeta(meta, itemCount = 0) {
  return {
    ...defaultMeta,
    ...(meta || {}),
    total: Number(meta?.total ?? itemCount),
    current_page: Number(meta?.current_page ?? meta?.page ?? defaultMeta.current_page),
    per_page: Number(meta?.per_page ?? meta?.perPage ?? defaultMeta.per_page),
    last_page: Number(meta?.last_page ?? defaultMeta.last_page),
  }
}

function normalizeRole(role) {
  const permissions = Array.isArray(role?.permissions) ? role.permissions : []

  return {
    ...role,
    permissions,
    permission_count: permissions.length,
    permissions_text: permissions.length ? permissions.join(', ') : '-',
  }
}

export const useRoleStore = defineStore('roles', {
  state: () => ({
    roles: [],
    current: null,
    meta: { ...defaultMeta },
    loading: false,
    saving: false,
    error: '',
  }),
  getters: {
    items: (state) => state.roles,
  },
  actions: {
    async fetchRoles(params = {}) {
      this.loading = true
      this.error = ''

      try {
        const response = await roleService.list(params)
        const payload = unwrapData(response)
        const items = Array.isArray(payload.items) ? payload.items : []

        this.roles = items.map(normalizeRole)
        this.meta = normalizeMeta(payload.meta, this.roles.length)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load roles'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRole(id) {
      this.loading = true
      try {
        const response = await roleService.show(id)
        const payload = unwrapData(response)
        this.current = payload ? normalizeRole(payload) : null
      } finally {
        this.loading = false
      }
    },

    async createRole(payload) {
      this.saving = true
      this.error = ''
      try {
        const response = await roleService.create(payload)
        const createdRole = unwrapData(response)
        this.current = createdRole ? normalizeRole(createdRole) : null
        notifySuccess('Role created')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create role'
        throw error
      } finally {
        this.saving = false
      }
    },

    async updateRole(id, payload) {
      this.saving = true
      this.error = ''
      try {
        const response = await roleService.update(id, payload)
        const updatedRole = unwrapData(response)
        this.current = updatedRole ? normalizeRole(updatedRole) : null
        notifySuccess('Role updated')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update role'
        throw error
      } finally {
        this.saving = false
      }
    },

    async deleteRole(id) {
      try {
        await roleService.remove(id)
        this.roles = this.roles.filter((role) => String(role.id) !== String(id))
        this.meta = normalizeMeta({ ...this.meta, total: Math.max(0, Number(this.meta.total || 0) - 1) }, this.roles.length)
        notifySuccess('Role deleted')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete role'
        throw error
      }
    },
  },
})
