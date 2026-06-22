import api from '@/libs/http'

export interface Notification {
  id: string
  type?: string
  data?: { title?: string; message?: string; url?: string }
  read_at?: string | null
  created_at?: string
}

export const notificationService = {
  async list(perPage?: number): Promise<Notification[]> {
    const { data } = await api.get('/notifications', { params: perPage ? { per_page: perPage } : undefined })
    return data.data?.data ?? data.data ?? []
  },
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
}
