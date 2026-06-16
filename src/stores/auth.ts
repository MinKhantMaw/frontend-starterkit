import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { authApi, type ChangePasswordPayload, type LoginPayload } from '@/api/auth'
import type { AuthUser } from '@/types'
import { tokenStorage } from '@/utils/auth'
import { hasPermission } from '@/utils/permissions'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: tokenStorage.get(),
    user: null as AuthUser | null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    permissions: (state) => state.user?.permissions ?? [],
    roles: (state) => state.user?.roles ?? [],
  },
  actions: {
    can(permission?: string | string[]) {
      return hasPermission(this.permissions, permission)
    },
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const response = await authApi.login(payload)
        const token = response.token || response.access_token
        if (!token) throw new Error('Login response did not include a token')
        this.token = token
        tokenStorage.set(token)
        this.user = response.user ?? (await authApi.profile())
        ElMessage.success('Logged in successfully')
      } finally {
        this.loading = false
      }
    },
    async fetchProfile() {
      if (!this.token) return
      this.loading = true
      try {
        this.user = await authApi.profile()
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        if (this.token) await authApi.logout()
      } finally {
        this.clearSession()
      }
    },
    clearSession() {
      this.token = null
      this.user = null
      tokenStorage.clear()
    },
    async changePassword(payload: ChangePasswordPayload) {
      this.loading = true
      try {
        await authApi.changePassword(payload)
        ElMessage.success('Password changed')
      } finally {
        this.loading = false
      }
    },
  },
})
