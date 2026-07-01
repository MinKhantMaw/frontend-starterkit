import { defineStore } from 'pinia'
import { dashboardService } from './service'

const emptyOverview = () => ({
  total_users: 0,
  active_users: 0,
  inactive_users: 0,
  total_roles: 0,
  total_permissions: 0,
  recent_users: [],
})

function normalizeOverview(response) {
  const data = response.data?.data ?? {}

  return {
    total_users: data.total_users ?? 0,
    active_users: data.active_users ?? 0,
    inactive_users: data.inactive_users ?? 0,
    total_roles: data.total_roles ?? 0,
    total_permissions: data.total_permissions ?? 0,
    recent_users: Array.isArray(data.recent_users) ? data.recent_users : [],
  }
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    overview: emptyOverview(),
    loading: false,
    error: '',
  }),
  getters: {
    metrics: (state) => [
      { label: 'Total Users', value: state.overview.total_users, icon: 'pi pi-users' },
      { label: 'Active Users', value: state.overview.active_users, icon: 'pi pi-user-plus' },
      { label: 'Inactive Users', value: state.overview.inactive_users, icon: 'pi pi-user-minus' },
      { label: 'Total Roles', value: state.overview.total_roles, icon: 'pi pi-id-card' },
      { label: 'Total Permissions', value: state.overview.total_permissions, icon: 'pi pi-shield' },
    ],
  },
  actions: {
    async fetchOverview() {
      this.loading = true
      this.error = ''

      try {
        const response = await dashboardService.overview()
        this.overview = normalizeOverview(response)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load dashboard data'
        this.overview = emptyOverview()
      } finally {
        this.loading = false
      }
    },
  },
})
