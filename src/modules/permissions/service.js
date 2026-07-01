import api from '@/services/api'

export const permissionService = {
  list(params = {}) {
    return api.get('/permissions', { params })
  },
}
