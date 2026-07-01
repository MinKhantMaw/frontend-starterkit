import { computed, onMounted, reactive } from 'vue'
import { usePermissionStore } from '@/modules/permissions/store'

export function usePermissionList() {
  const permissions = usePermissionStore()
  const filters = reactive({ search: '' })
  const groupedPermissions = computed(() => permissions.grouped)
  const hasPermissions = computed(() => Object.values(groupedPermissions.value).some((items) => Array.isArray(items) && items.length > 0))

  function load() {
    return permissions.fetchPermissions(filters)
  }

  function resetFilters() {
    filters.search = ''
    load()
  }

  onMounted(load)

  return { permissions, filters, groupedPermissions, hasPermissions, load, resetFilters }
}
