import { onMounted, reactive } from 'vue'
import { useNotificationStore } from '@/modules/notifications/stores/notificationStore'

export function useList() {
  const activityLogs = useNotificationStore()
  const filters = reactive({ search: '' })
  const columns = [
    { field: 'actor', header: 'Actor' },
    { field: 'action', header: 'Action' },
    { field: 'module', header: 'Module' },
    { field: 'createdAt', header: 'Created At' },
  ]

  function load() {
    return activityLogs.fetchLogs(filters)
  }

  function resetFilters() {
    filters.search = ''
    load()
  }

  onMounted(load)

  return { activityLogs, filters, columns, load, resetFilters }
}
