import { defineStore } from 'pinia'
import { dashboardApi, type DashboardOverview } from '@/modules/dashboard/service'

const emptyStats: DashboardOverview = {
  total_users: 0,
  active_users: 0,
  total_posts: 0,
  published_posts: 0,
  total_pages: 0,
  total_media: 0,
  recent_activities: [],
  latest_posts: [],
  monthly_content: [],
  monthly_users: [],
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: emptyStats,
    loading: false,
  }),
  actions: {
    async fetchStats() {
      this.loading = true
      try {
        this.stats = await dashboardApi.getStats()
      } finally {
        this.loading = false
      }
    },
  },
})
