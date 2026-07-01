import api from '@/api/http'

export const dashboardService = {
  async overview() {
    return api.get('/dashboard/overview')
  },
}
