import api from '@/libs/http'

export interface Activity {
  id: number
  description: string
  event?: string
  causer?: { name: string; email?: string }
  subject_type?: string
  created_at?: string
  ip_address?: string
}

export interface ActivityFilters {
  page: number
  search?: string
  event?: string
  date?: string
}

export const activityService = {
  async list(params: ActivityFilters) {
    const { data } = await api.get('/activity-logs', { params })
    const payload = data.data ?? data
    const items: Activity[] = payload.data ?? payload
    return { items, total: payload.meta?.total ?? data.meta?.total ?? items.length }
  },
}
