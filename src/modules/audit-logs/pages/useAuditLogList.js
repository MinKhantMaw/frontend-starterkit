import { onMounted, reactive } from 'vue'
import { useAuditLogStore } from '@/modules/audit-logs/stores/auditLogStore'

export function useList() {
  const activityLogs = useAuditLogStore()
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
