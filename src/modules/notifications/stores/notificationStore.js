import { defineStore } from 'pinia'
import { notificationService } from '@/modules/notifications/services/notificationService.js'

const defaultMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
}

function unwrapData(response) {
  return response?.data?.data ?? {}
}

export const useNotificationStore = defineStore('notifications', {
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
        const response = await notificationService.list(params)
        const payload = unwrapData(response)

        this.items = Array.isArray(payload.items) ? payload.items : []
        this.meta = payload.meta ?? { ...defaultMeta }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load notifications'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
