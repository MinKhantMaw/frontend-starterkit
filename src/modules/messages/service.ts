import api from '@/libs/http'

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject?: string
  message: string
  read_at?: string | null
  created_at?: string
}

export const messageService = {
  async list(): Promise<ContactMessage[]> {
    const { data } = await api.get('/contact-messages')
    return data.data?.data ?? data.data ?? []
  },
  async get(id: number): Promise<ContactMessage> {
    const { data } = await api.get(`/contact-messages/${id}`)
    return data.data ?? data
  },
  markRead: (id: number) => api.patch(`/contact-messages/${id}/read`),
  markUnread: (id: number) => api.patch(`/contact-messages/${id}/unread`),
  remove: (id: number) => api.delete(`/contact-messages/${id}`),
}
