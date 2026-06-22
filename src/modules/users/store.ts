import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { usersApi, type UserPayload } from '@/modules/users/service'
import type { PaginationMeta, QueryParams, User } from '@/libs/types'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    current: null as User | null,
    meta: null as PaginationMeta | null,
    loading: false,
  }),
  actions: {
    async fetchUsers(params: QueryParams = {}) {
      this.loading = true
      try {
        const response = await usersApi.list(params)
        this.users = response.data
        this.meta = response.meta ?? null
      } finally {
        this.loading = false
      }
    },
    async fetchUser(id: string | number) {
      this.loading = true
      try {
        this.current = await usersApi.get(id)
      } finally {
        this.loading = false
      }
    },
    async createUser(payload: UserPayload) {
      const user = await usersApi.create(payload)
      if (payload.role_id) await usersApi.assignRole(user.id, payload.role_id)
      ElMessage.success('User created')
    },
    async updateUser(id: string | number, payload: UserPayload) {
      await usersApi.update(id, payload)
      if (payload.role_id) await usersApi.assignRole(id, payload.role_id)
      ElMessage.success('User updated')
    },
    async deleteUser(id: string | number) {
      await usersApi.remove(id)
      ElMessage.success('User deleted')
    },
    async setUserStatus(id: string | number, status: string) {
      await usersApi.setStatus(id, status)
      ElMessage.success('User status updated')
    },
  },
})
