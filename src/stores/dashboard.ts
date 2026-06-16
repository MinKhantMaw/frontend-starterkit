import { defineStore } from 'pinia'
import { dashboardApi } from '@/api/dashboard'
import type { DashboardStats } from '@/types'

const emptyStats: DashboardStats = {
  total_users: 0,
  active_users: 0,
  total_roles: 0,
  total_permissions: 0,
  total_contents: 0,
  published_contents: 0,
  draft_contents: 0,
  recent_users: [],
  recent_contents: [],
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
