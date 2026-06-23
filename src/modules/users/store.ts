import { defineStore } from 'pinia'
import { userService } from './service'
import { notifySuccess } from '@/utils/notify'
import type { PaginationMeta } from '@/types/api'
import type { User, UserCreatePayload, UserFilters, UserUpdatePayload } from '@/modules/users/types'

export const useUserStore = defineStore('users', {
  state: () => ({
    items: [] as User[],
    current: null as User | null | undefined,
    meta: { page: 1, perPage: 10, total: 0 } as PaginationMeta,
    loading: false,
    saving: false,
    error: '' as string,
  }),
  actions: {
    async fetchUsers(params: UserFilters = {}): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        const response = await userService.list(params)
        this.items = response.data
        this.meta = response.meta
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load users'
      } finally {
        this.loading = false
      }
    },
    async fetchUser(id: string | number): Promise<void> {
      this.loading = true
      try {
        this.current = await userService.find(id)
      } finally {
        this.loading = false
      }
    },
    async createUser(payload: UserCreatePayload): Promise<void> {
      this.saving = true
      try {
        await userService.create(payload)
        notifySuccess('User created')
      } finally {
        this.saving = false
      }
    },
    async updateUser(id: string | number, payload: Partial<UserUpdatePayload>): Promise<void> {
      this.saving = true
      try {
        this.current = await userService.update(id, payload)
        notifySuccess('User updated')
      } finally {
        this.saving = false
      }
    },
    async deleteUser(id: string | number): Promise<void> {
      await userService.remove(id)
      notifySuccess('User deleted')
    },
  },
})
