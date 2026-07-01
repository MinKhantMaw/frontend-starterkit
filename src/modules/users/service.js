import api from '@/api/http'

export const userService = {
  list(params = {}) {
    return api.get('/users', { params })
  },

  find(id) {
    return api.get(`/users/${id}`)
  },

  create(payload) {
    return api.post('/users', payload)
  },

  update(id, payload) {
    return api.put(`/users/${id}`, payload)
  },

  updateStatus(id, status) {
    return api.patch(`/users/${id}/status`, { status })
  },

  remove(id) {
    return api.delete(`/users/${id}`)
  },
}
