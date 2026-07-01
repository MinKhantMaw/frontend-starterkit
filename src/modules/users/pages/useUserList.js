import { computed, onMounted, reactive } from 'vue'
import { useConfirmAction } from '@/composables/useConfirmAction'
import { useUserStore } from '@/modules/users/store'
import { useRoleStore } from '@/modules/roles/store'
import { USER_STATUSES } from '@/constants/app'

export function useList() {
  const { confirmDelete: confirmDeleteAction } = useConfirmAction()
  const users = useUserStore()
  const roleStore = useRoleStore()
  const filters = reactive({ page: 1, perPage: 15, search: '', role_id: '', status: '' })

  const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'failed_login_attempts', header: 'Failed Attempts' },
    { field: 'locked_at', header: 'Locked At' },
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
    confirmDeleteAction({
      name: user.name,
      onAccept: async () => {
        await users.deleteUser(user.id)
        await load()
      },
    })
  }

  async function reactivate(user) {
    await users.updateStatus(user.id, 'active')
    await load()
  }

  onMounted(() => Promise.all([load(), roleStore.fetchRoles()]))

  return { users, filters, columns, pagination, roleOptions, statusOptions: USER_STATUSES, load, applyFilters, resetFilters, confirmDelete, reactivate }
}
