import { defineStore } from 'pinia'
import { notificationService, type Notification } from './service'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({ items: [] as Notification[], loading: false }),
  getters: { unread: (state) => state.items.filter((item) => !item.read_at).length },
  actions: {
    async fetchNotifications(perPage?: number) {
      this.loading = true
      try { this.items = await notificationService.list(perPage) } finally { this.loading = false }
    },
    async markRead(id: string) {
      await notificationService.markRead(id)
      const item = this.items.find((entry) => entry.id === id)
      if (item) item.read_at = new Date().toISOString()
    },
    async markAllRead() {
      await notificationService.markAllRead()
      this.items.forEach((item) => { item.read_at ||= new Date().toISOString() })
    },
  },
})
