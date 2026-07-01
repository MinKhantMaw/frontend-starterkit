import { computed, onMounted, reactive } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useUserStore } from '@/modules/users/store'
import { useRoleStore } from '@/modules/roles/store'
import { USER_STATUSES } from '@/constants/app'

export function useList() {
  const confirm = useConfirm()
  const users = useUserStore()
  const roleStore = useRoleStore()
  const filters = reactive({ page: 1, perPage: 15, search: '', role_id: '', status: '' })

  const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
  ]

  const pagination = computed(() => users.meta || {})
  const roleOptions = computed(() =>
    roleStore.roles.map((role) => ({
      label: role.name,
      value: role.id,
    })),
  )

  async function load(page = filters.page, perPage = filters.perPage) {
    filters.page = page
    filters.perPage = perPage

    await users.fetchUsers(filters)
  }

  function applyFilters() {
    load(1, filters.perPage)
  }

  function resetFilters() {
    filters.search = ''
    filters.role_id = ''
    filters.status = ''
    load(1, filters.perPage)
  }

  function confirmDelete(user) {
    confirm.require({
      message: `Delete ${user.name}?`,
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-danger',
      accept: async () => {
        await users.deleteUser(user.id)
        await load()
      },
    })
  }

  onMounted(() => {
    load()
    roleStore.fetchRoles()
  })

  return { users, filters, columns, pagination, roleOptions, statusOptions: USER_STATUSES, load, applyFilters, resetFilters, confirmDelete }
}
