import api from '@/api/http'

export const activityLogService = {
  list(params = {}) {
    return api.get('/activity-logs', { params })
  },
}
