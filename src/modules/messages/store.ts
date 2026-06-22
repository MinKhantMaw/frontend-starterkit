import { defineStore } from 'pinia'
import { messageService, type ContactMessage } from './service'

export const useMessageStore = defineStore('messages', {
  state: () => ({ items: [] as ContactMessage[], selected: undefined as ContactMessage | undefined, loading: false }),
  actions: {
    async fetchMessages() {
      this.loading = true
      try { this.items = await messageService.list() } finally { this.loading = false }
    },
    async fetchMessage(id: number) { this.selected = await messageService.get(id) },
    markRead(id: number) { return messageService.markRead(id) },
    markUnread(id: number) { return messageService.markUnread(id) },
    remove(id: number) { return messageService.remove(id) },
  },
})
