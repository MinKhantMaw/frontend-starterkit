import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue/useconfirm'
import type { ContactMessage } from '../service'
import { useMessageStore } from '../store'

export function useList() {
  const store = useMessageStore()
  const { items, loading, selected } = storeToRefs(store)
  const open = ref(false)
  
  const confirm = useConfirm()
  
  const columns = [{ field: 'name', header: 'Sender' }, { field: 'subject', header: 'Subject' }, { field: 'read_at', header: 'Status' }, { field: 'created_at', header: 'Received' }]
  
  async function load() { await store.fetchMessages() }
  
  async function view(item: ContactMessage) { await store.fetchMessage(item.id); open.value = true; if (selected.value && !selected.value.read_at) await mark(selected.value, true) }
  
  async function mark(item: ContactMessage, read: boolean) { await (read ? store.markRead(item.id) : store.markUnread(item.id)); item.read_at = read ? new Date().toISOString() : null }
  
  function remove(item: ContactMessage) { confirm.require({ message: 'Permanently delete this message?', header: 'Delete message', acceptProps: { label: 'Delete', severity: 'danger' }, accept: async () => { await store.remove(item.id); await load() } }) }
  
  onMounted(load)

  return { items, loading, selected, open, confirm, columns, load, view, mark, remove }
}
