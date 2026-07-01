import api from '@/api/http'

export const roleService = {
  list(params = {}) {
    return api.get('/roles', { params })
  },

  show(id) {
    return api.get(`/roles/${id}`)
  },

  find(id) {
    return this.show(id)
  },

  create(payload) {
    return api.post('/roles', payload)
  },

  update(id, payload) {
    return api.put(`/roles/${id}`, payload)
  },

  remove(id) {
    return api.delete(`/roles/${id}`)
  },

  syncPermissions(id, permissions) {
    return api.patch(`/roles/${id}/permissions`, { permissions })
  },
}
