import { onMounted, reactive } from 'vue'
import { usePermissionStore } from '@/modules/permissions/store'

export function useList() {
  const permissions = usePermissionStore()
  const filters = reactive({ search: '' })

  function load() {
    return permissions.fetchPermissions(filters)
  }

  function resetFilters() {
    filters.search = ''
    load()
  }

  onMounted(load)

  return { permissions, filters, load, resetFilters }
}
