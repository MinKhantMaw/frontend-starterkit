import { defineStore } from 'pinia'
import { activityLogService } from '@/modules/activity-logs/services/activityLogService'
import type { PaginationMeta } from '@/types/api'
import type { LogEntry, LogFilters } from '@/types/logs'

export const useActivityLogStore = defineStore('activityLogs', {
  state: () => ({
    items: [] as LogEntry[],
    meta: { page: 1, perPage: 10, total: 0 } as PaginationMeta,
    loading: false,
    error: '' as string,
  }),
  actions: {
    async fetchLogs(params: LogFilters = {}): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        const response = await activityLogService.list(params)
        this.items = response.data
        this.meta = response.meta
      } finally {
        this.loading = false
      }
    },
  },
})
