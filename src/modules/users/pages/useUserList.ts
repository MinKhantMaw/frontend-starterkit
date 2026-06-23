import { computed, onMounted, reactive } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useUserStore } from '@/modules/users/store'
import { ROLE_OPTIONS, USER_STATUSES } from '@/constants/app'
import type { User } from '@/modules/users/types'

export function useList() {
  const confirm = useConfirm()
  const users = useUserStore()
  const filters = reactive({ page: 1, perPage: 10, search: '', role: '', status: '' })

  const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' },
  ]

  const pagination = computed(() => users.meta)

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
    filters.role = ''
    filters.status = ''
    load(1, filters.perPage)
  }

  function confirmDelete(user: User) {
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

  onMounted(() => load())

  return { users, filters, columns, pagination, roleOptions: ROLE_OPTIONS, statusOptions: USER_STATUSES, load, applyFilters, resetFilters, confirmDelete }
}
