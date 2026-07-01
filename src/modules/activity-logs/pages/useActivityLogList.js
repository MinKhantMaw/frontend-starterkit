import { computed, onMounted, reactive } from 'vue'
import { useActivityLogStore } from '@/modules/activity-logs/stores/activityLogStore'

export function useList() {
  const activityLogs = useActivityLogStore()
  const filters = reactive({ page: 1, perPage: 15, search: '' })
  const columns = [
    { field: 'actor', header: 'Actor' },
    { field: 'action', header: 'Action' },
    { field: 'module', header: 'Module' },
    { field: 'createdAt', header: 'Created At' },
  ]
  const pagination = computed(() => activityLogs.meta || {})

  function load(page = filters.page, perPage = filters.perPage) {
    filters.page = page
    filters.perPage = perPage
    return activityLogs.fetchLogs(filters)
  }

  function resetFilters() {
    filters.search = ''
    load(1, filters.perPage)
  }

  onMounted(load)

  return { activityLogs, filters, columns, pagination, load, resetFilters }
}
