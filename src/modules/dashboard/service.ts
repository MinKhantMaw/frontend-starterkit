import api from '@/libs/http'
export interface DashboardOverview {
  total_users?: number
  active_users?: number
  total_posts?: number
  published_posts?: number
  total_pages?: number
  total_media?: number
  recent_activities?: Array<{ id: number; description: string; created_at?: string; causer?: { name: string } }>
  latest_posts?: Array<{ id: number; title: string; status: string; created_at?: string }>
  monthly_content?: number[]
  monthly_users?: number[]
}

export const dashboardApi = {
  async getStats() {
    const { data } = await api.get<{ data?: DashboardOverview } | DashboardOverview>('/dashboard/overview')
    return 'data' in data && data.data ? data.data : (data as DashboardOverview)
  },
}
