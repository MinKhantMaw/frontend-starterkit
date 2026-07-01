import api from '@/api/http'

export const notificationService = {
  list(params = {}) {
    return api.get('/notifications', { params })
  },
}
