import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { MenuItem } from '../service'
import { useMenuStore } from '../store'
import { notify } from '@/libs/notify'

export function useEdit() {
  const store = useMenuStore()
  const { menus, saving } = storeToRefs(store)
  const selectedId = ref<number>(), items = ref<MenuItem[]>([])
  
  const newItem = reactive({ label: '', url: '' })
  
  function add() { if (!newItem.label || !newItem.url) return; items.value.push({ client_id: crypto.randomUUID(), label: newItem.label, url: newItem.url, children: [] }); newItem.label = ''; newItem.url = '' }
  
  function remove(list: MenuItem[], index: number) { list.splice(index, 1) }
  
  async function select() { const menu = menus.value.find((entry) => entry.id === selectedId.value); items.value = structuredClone(menu?.items ?? []) }
  
  async function save() { if (!selectedId.value) return; await store.updateItems(selectedId.value, items.value); notify('success', 'Menu saved') }
  
  onMounted(async () => { await store.fetchMenus(); selectedId.value = menus.value[0]?.id; await select() })

  return { menus, selectedId, items, saving, newItem, add, remove, select, save }
}
