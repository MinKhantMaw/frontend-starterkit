import { defineStore } from 'pinia'
import { authService } from '@/modules/auth/service'
import { tokenStorage } from '@/api/tokenStorage'
import { hasPermission, hasRole } from '@/utils/permissions'
import { notifySuccess } from '@/utils/notify'
import type { AuthUser, LoginPayload, RoleKey } from '@/types/auth'

export interface AuthState {
  token: string | null
  user: AuthUser | null
  roles: RoleKey[]
  permissions: string[]
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: tokenStorage.get(),
    user: null,
    roles: [],
    permissions: [],
    loading: false,
  }),
  getters: {
    isAuthenticated: (state): boolean => Boolean(state.token),
  },
  actions: {
    setUser(user: AuthUser): void {
      this.user = user
      this.roles = user.roles || []
      this.permissions = user.permissions || []
    },
    hasRole(required?: string | string[]): boolean {
      return hasRole(this.roles, required)
    },
    hasPermission(required?: string | string[]): boolean {
      return hasPermission(this.permissions, this.roles, required)
    },
    async login(payload: LoginPayload): Promise<void> {
      this.loading = true
      try {
        const response = await authService.login(payload)
        const token = response.token || response.access_token
        if (!token) throw new Error('Login response did not include a token')

        this.token = token
        tokenStorage.set(token)
        this.setUser(response.user || (await authService.profile()))
        notifySuccess('Signed in successfully')
      } finally {
        this.loading = false
      }
    },
    async fetchProfile(): Promise<void> {
      if (!this.token) return
      this.loading = true
      try {
        this.setUser(await authService.profile())
      } finally {
        this.loading = false
      }
    },
    async logout(): Promise<void> {
      try {
        await authService.logout()
      } finally {
        this.clearSession()
      }
    },
    clearSession(): void {
      this.token = null
      this.user = null
      this.roles = []
      this.permissions = []
      tokenStorage.clear()
    },
  },
})
