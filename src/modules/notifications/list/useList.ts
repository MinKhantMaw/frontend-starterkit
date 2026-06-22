import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Notification } from '../service'
import { useNotificationStore } from '../store'

export function useList() {
  const store = useNotificationStore()
  const { items, loading, unread } = storeToRefs(store)
  
  async function load() { await store.fetchNotifications() }
  
  async function mark(item: Notification) { if (item.read_at) return; await store.markRead(item.id) }
  
  async function markAll() { await store.markAllRead() }
  
  onMounted(load)

  return { items, loading, unread, load, mark, markAll }
}
