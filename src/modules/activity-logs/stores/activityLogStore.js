import { defineStore } from 'pinia'
import { activityLogService } from '@/modules/activity-logs/services/activityLogService.js'

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

export const useActivityLogStore = defineStore('activityLogs', {
  state: () => ({
    items: [],
    meta: { ...defaultMeta },
    loading: false,
    error: '',
  }),
  actions: {
    async fetchLogs(params = {}) {
      this.loading = true
      this.error = ''
      try {
        const response = await activityLogService.list(params)
        const payload = unwrapData(response)
        const items = Array.isArray(payload.items) ? payload.items : []

        this.items = items
        this.meta = normalizeMeta(payload.meta, this.items.length)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load activity logs'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
