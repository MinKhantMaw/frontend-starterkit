import api from './http'
import type { DashboardStats } from '@/types'

export const dashboardApi = {
  async getStats() {
    const { data } = await api.get<{ data?: DashboardStats } | DashboardStats>('/dashboard/overview')
    return 'data' in data && data.data ? data.data : (data as DashboardStats)
  },
}
