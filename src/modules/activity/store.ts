import { defineStore } from 'pinia'
import { activityService, type Activity, type ActivityFilters } from './service'

export const useActivityStore = defineStore('activity', {
  state: () => ({ items: [] as Activity[], total: 0, loading: false }),
  actions: {
    async fetchActivities(filters: ActivityFilters) {
      this.loading = true
      try {
        const result = await activityService.list(filters)
        this.items = result.items
        this.total = result.total
      } finally {
        this.loading = false
      }
    },
  },
})
