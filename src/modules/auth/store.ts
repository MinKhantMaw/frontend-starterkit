import { defineStore } from 'pinia'
import { authApi, type ChangePasswordPayload, type LoginPayload } from '@/modules/auth/service'
import type { AuthUser } from '@/libs/types'
import { tokenStorage } from '@/libs/auth'
import { notify } from '@/libs/notify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: tokenStorage.get(),
    user: null as AuthUser | null,
    roles: [] as string[],
    permissions: [] as string[],
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    rolesList: (state) => (Array.isArray(state.roles) ? state.roles : []),
    permissionsList: (state) => (Array.isArray(state.permissions) ? state.permissions : []),
  },
  actions: {
    setUser(user: AuthUser) {
      this.user = user
      this.roles = Array.isArray(user.roles) ? user.roles : []
      this.permissions = Array.isArray(user.permissions) ? user.permissions : []
    },
    hasRole(required?: string | string[]) {
      if (!required) return false
      const roles = Array.isArray(this.roles) ? this.roles : []
      const requiredRoles = Array.isArray(required) ? required : [required]
      return requiredRoles.some((role) => roles.includes(role))
    },
    hasPermission(required?: string | string[]) {
      if (!required) return true
      if (this.hasRole('Super Admin')) return true
      const permissions = Array.isArray(this.permissions) ? this.permissions : []
      const requiredPermissions = Array.isArray(required) ? required : [required]
      return requiredPermissions.every((permission) => permissions.includes(permission))
    },
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const response = await authApi.login(payload)
        const token = response.token ?? response.access_token
        if (!token) throw new Error('Login response did not include a token')
        this.token = token
        tokenStorage.set(token)

        const user = response.user ?? (await authApi.profile())
        this.setUser(user)

        notify('success', 'Welcome back', `Signed in as ${user.name}`)
      } finally {
        this.loading = false
      }
    },
    async fetchProfile() {
      if (!this.token) return
      this.loading = true
      try {
        const user = await authApi.profile()
        this.setUser(user)
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
      this.roles = []
      this.permissions = []
      tokenStorage.clear()
    },
    async changePassword(payload: ChangePasswordPayload) {
      this.loading = true
      try {
        await authApi.changePassword(payload)
        notify('success', 'Password changed')
      } finally {
        this.loading = false
      }
    },
  },
})
