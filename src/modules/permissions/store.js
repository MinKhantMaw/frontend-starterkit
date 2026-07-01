import { defineStore } from 'pinia'
import { permissionService } from './service.js'

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

function normalizePermissionItems(payload) {
  if (Array.isArray(payload.items)) return payload.items

  if (payload.items && typeof payload.items === 'object') {
    return Object.values(payload.items).flatMap((items) => (Array.isArray(items) ? items : []))
  }

  if (Array.isArray(payload.permissions)) return payload.permissions

  if (payload.permissions && typeof payload.permissions === 'object') {
    return Object.entries(payload.permissions).flatMap(([module, items]) => {
      if (!Array.isArray(items)) return []
      return items.map((permission) => ({
        ...permission,
        module: permission.module || module,
      }))
    })
  }

  return []
}

export const usePermissionStore = defineStore('permissions', {
  state: () => ({
    permissions: [],
    meta: { ...defaultMeta },
    loading: false,
  }),
  getters: {
    items: (state) => state.permissions,
    grouped: (state) =>
      (Array.isArray(state.permissions) ? state.permissions : []).reduce((groups, permission) => {
        const module = permission.module || permission.group || 'general'
        groups[module] = groups[module] || []
        groups[module].push(permission)
        return groups
      }, {}),
  },
  actions: {
    async fetchPermissions(params = {}) {
      this.loading = true
      try {
        const response = await permissionService.list(params)
        const payload = unwrapData(response)

        this.permissions = normalizePermissionItems(payload)
        this.meta = normalizeMeta(payload.meta, this.permissions.length)
      } finally {
        this.loading = false
      }
    },
  },
})
