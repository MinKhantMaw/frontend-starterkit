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

        this.items = Array.isArray(payload.items) ? payload.items : []
        this.meta = payload.meta ?? { ...defaultMeta }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load activity logs'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
