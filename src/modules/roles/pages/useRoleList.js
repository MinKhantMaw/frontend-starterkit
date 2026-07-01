import { onMounted, reactive } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useRoleStore } from '@/modules/roles/store'

export function useList() {
  const confirm = useConfirm()
  const roles = useRoleStore()
  const filters = reactive({ search: '' })
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'guard_name', header: 'Guard' },
    { field: 'permission_count', header: 'Permissions' },
    { field: 'created_at', header: 'Created At' },
  ]

  function load() {
    return roles.fetchRoles(filters)
  }

  function resetFilters() {
    filters.search = ''
    load()
  }

  function confirmDelete(role) {
    confirm.require({
      message: `Delete ${role.name}?`,
      header: 'Delete role',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-danger',
      accept: async () => {
        await roles.deleteRole(role.id)
        await load()
      },
    })
  }

  onMounted(load)

  return { roles, filters, columns, load, resetFilters, confirmDelete }
}
