import api from '@/api/http'

export const auditLogService = {
  list(params = {}) {
    return api.get('/audit-logs', { params })
  },
}
