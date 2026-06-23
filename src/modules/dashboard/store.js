import { defineStore } from 'pinia'
import { dashboardService } from './service'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    metrics: [],
    loading: false,
  }),
  actions: {
    async fetchOverview() {
      this.loading = true
      try {
        const response = await dashboardService.overview()
        this.metrics = response.metrics
      } finally {
        this.loading = false
      }
    },
  },
})
