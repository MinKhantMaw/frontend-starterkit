import api from '@/api/http'
import type { PaginatedResponse } from '@/types/api'
import type { LogEntry, LogFilters } from '@/types/logs'

const logs: LogEntry[] = [
  { id: 1, actor: 'Enterprise Admin', action: 'Logged in', module: 'Authentication', createdAt: '2026-06-23 09:00' },
  { id: 2, actor: 'Operations Manager', action: 'Viewed users', module: 'Users', createdAt: '2026-06-23 09:15' },
  { id: 3, actor: 'Enterprise Admin', action: 'Reviewed permissions', module: 'Permissions', createdAt: '2026-06-23 10:30' },
]

export const activityLogService = {
  async list(params: LogFilters = {}): Promise<PaginatedResponse<LogEntry>> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<PaginatedResponse<LogEntry>>('/activity-logs', { params })
      return data
    }
    const search = params.search?.toLowerCase()
    const data = search ? logs.filter((log) => [log.actor, log.action, log.module].some((value) => value.toLowerCase().includes(search))) : logs
    return { data, meta: { page: 1, perPage: 10, total: data.length } }
  },
}
