import { onMounted, reactive } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useRoleStore } from '@/modules/roles/store'
import type { Role } from '@/modules/roles/types'

export function useList() {
  const confirm = useConfirm()
  const roles = useRoleStore()
  const filters = reactive({ search: '' })
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'key', header: 'Key' },
  ]

  function load() {
    return roles.fetchRoles(filters)
  }

  function resetFilters() {
    filters.search = ''
    load()
  }

  function confirmDelete(role: Role) {
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
