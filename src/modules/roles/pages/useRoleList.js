import { computed, onMounted, reactive } from 'vue'
import { useConfirmAction } from '@/composables/useConfirmAction'
import { useRoleStore } from '@/modules/roles/store'

export function useList() {
  const { confirmDelete: confirmDeleteAction } = useConfirmAction()
  const roles = useRoleStore()
  const filters = reactive({ page: 1, perPage: 15, search: '' })
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'guard_name', header: 'Guard' },
    { field: 'permission_count', header: 'Permissions' },
    { field: 'created_at', header: 'Created At' },
  ]
  const pagination = computed(() => roles.meta || {})

  function load(page = filters.page, perPage = filters.perPage) {
    filters.page = page
    filters.perPage = perPage
    return roles.fetchRoles(filters)
  }

  function resetFilters() {
    filters.search = ''
    load(1, filters.perPage)
  }

  function confirmDelete(role) {
    confirmDeleteAction({
      name: role.name,
      onAccept: async () => {
        await roles.deleteRole(role.id)
        await load()
      },
    })
  }

  onMounted(load)

  return { roles, filters, columns, pagination, load, resetFilters, confirmDelete }
}
