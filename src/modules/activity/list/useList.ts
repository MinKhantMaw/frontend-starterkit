import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useActivityStore } from '../store'

export function useList() {
  const store = useActivityStore()
  const { items, loading, total } = storeToRefs(store)
  const page = ref(1)
  
  const filters = reactive({ search: '', event: '', date: null as Date | null })
  
  const columns = [{ field: 'description', header: 'Activity' }, { field: 'causer', header: 'User' }, { field: 'event', header: 'Event' }, { field: 'created_at', header: 'Date' }]
  
  async function load() { await store.fetchActivities({ page: page.value, search: filters.search || undefined, event: filters.event || undefined, date: filters.date?.toISOString().slice(0, 10) }) }
  
  function clear() { Object.assign(filters, { search: '', event: '', date: null }); void load() }
  
  onMounted(load)

  return { items, loading, total, page, filters, columns, load, clear }
}
