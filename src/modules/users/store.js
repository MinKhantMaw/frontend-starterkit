import { defineStore } from 'pinia'
import { userService } from './service.js'
import { notifySuccess } from '@/utils/notify'

const defaultMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
}

function unwrapData(response) {
  return response?.data?.data ?? {}
}

function normalizeUser(user) {
  const roles = Array.isArray(user?.roles) ? user.roles : []

  return {
    ...user,
    role: roles.length ? roles.join(', ') : user?.role || '-',
    roles,
  }
}

function normalizeMeta(meta, itemCount = 0) {
  return {
    ...defaultMeta,
    ...(meta || {}),
    total: Number(meta?.total ?? itemCount),
    current_page: Number(meta?.current_page ?? meta?.page ?? defaultMeta.current_page),
    per_page: Number(meta?.per_page ?? meta?.perPage ?? defaultMeta.per_page),
    last_page: Number(meta?.last_page ?? defaultMeta.last_page),
  }
}

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    current: null,
    meta: { ...defaultMeta },
    loading: false,
    saving: false,
    error: '',
  }),
  getters: {
    items: (state) => state.users,
  },
  actions: {
    async fetchUsers(params = {}) {
      this.loading = true
      this.error = ''
      try {
        const response = await userService.list(params)
        const payload = unwrapData(response)
        const items = Array.isArray(payload?.items) ? payload.items : []

        this.users = items.map(normalizeUser)
        this.meta = normalizeMeta(payload?.meta, this.users.length)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load users'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser(id) {
      this.loading = true
      try {
        const response = await userService.find(id)
        const payload = unwrapData(response)
        this.current = payload ? normalizeUser(payload) : null
      } finally {
        this.loading = false
      }
    },

    async createUser(payload) {
      this.saving = true
      this.error = ''
      try {
        const response = await userService.create(payload)
        const createdUser = unwrapData(response)
        this.current = createdUser ? normalizeUser(createdUser) : null
        if (this.current) {
          this.users = [this.current, ...this.users]
          this.meta = normalizeMeta({ ...this.meta, total: this.meta.total + 1 }, this.users.length)
        }
        notifySuccess('User created')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create user'
        throw error
      } finally {
        this.saving = false
      }
    },

    async updateUser(id, payload) {
      this.saving = true
      this.error = ''
      try {
        const response = await userService.update(id, payload)
        const updatedUser = unwrapData(response)
        this.current = updatedUser ? normalizeUser(updatedUser) : null
        if (this.current) {
          this.users = this.users.map((item) => (String(item.id) === String(id) ? { ...item, ...this.current } : item))
        }
        notifySuccess('User updated')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update user'
        throw error
      } finally {
        this.saving = false
      }
    },

    async deleteUser(id) {
      try {
        await userService.remove(id)
        this.users = this.users.filter((item) => String(item.id) !== String(id))
        this.meta = normalizeMeta({ ...this.meta, total: Math.max(0, this.meta.total - 1) }, this.users.length)
        notifySuccess('User deleted')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete user'
        throw error
      }
    },
  },
})
