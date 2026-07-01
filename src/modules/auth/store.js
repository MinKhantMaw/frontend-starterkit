import { defineStore } from 'pinia'
import { authService } from '@/modules/auth/service.js'
import { tokenStorage } from '@/api/tokenStorage'
import { hasPermission, hasRole } from '@/utils/permissions'
import { notifySuccess } from '@/utils/notify'

const TEMPORARY_2FA_TOKEN_KEY = 'enterprise_admin_temporary_2fa_token'

function getTemporaryTwoFactorToken() {
  return window.sessionStorage.getItem(TEMPORARY_2FA_TOKEN_KEY)
}

function setStoredTemporaryTwoFactorToken(token) {
  window.sessionStorage.setItem(TEMPORARY_2FA_TOKEN_KEY, token)
}

function clearStoredTemporaryTwoFactorToken() {
  window.sessionStorage.removeItem(TEMPORARY_2FA_TOKEN_KEY)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: tokenStorage.get(),
    user: null,
    roles: [],
    permissions: [],
    temporaryTwoFactorToken: getTemporaryTwoFactorToken(),
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    setUser(user) {
      this.user = user
      this.roles = Array.isArray(user?.roles) ? user.roles : []
      this.permissions = Array.isArray(user?.permissions) ? user.permissions : []
    },
    hasRole(required) {
      return hasRole(this.roles, required)
    },
    hasPermission(required) {
      return hasPermission(this.permissions, this.roles, required)
    },
    setAuthenticatedSession(token, user) {
      this.token = token
      tokenStorage.set(token)
      if (user) this.setUser(user)
    },
    setTemporaryTwoFactorToken(token) {
      this.temporaryTwoFactorToken = token
      setStoredTemporaryTwoFactorToken(token)
    },
    clearTwoFactorChallenge() {
      this.temporaryTwoFactorToken = null
      clearStoredTemporaryTwoFactorToken()
    },
    async login(payload) {
      if (this.loading) return { requiresTwoFactor: false }

      this.loading = true
      try {
        const response = await authService.login(payload)

        if (response.requires_2fa) {
          if (!response.temporary_token) throw new Error('Two-factor challenge token was not returned')
          this.clearSession()
          this.setTemporaryTwoFactorToken(response.temporary_token)
          return { requiresTwoFactor: true }
        }

        const token = response.token || response.access_token
        if (!token) throw new Error('Login response did not include a token')

        this.clearTwoFactorChallenge()
        this.setAuthenticatedSession(token)
        await this.fetchProfile()
        notifySuccess('Signed in successfully')
        return { requiresTwoFactor: false }
      } finally {
        this.loading = false
      }
    },
    async verifyTwoFactor(code) {
      if (this.loading) return
      if (!this.temporaryTwoFactorToken) throw new Error('Two-factor challenge has expired')

      this.loading = true
      try {
        const response = await authService.verifyTwoFactor({
          code,
          temporary_token: this.temporaryTwoFactorToken,
        })
        const token = response.token || response.access_token
        if (!token) throw new Error('Two-factor response did not include a token')

        this.clearTwoFactorChallenge()
        this.setAuthenticatedSession(token)
        await this.fetchProfile()
        notifySuccess('Signed in successfully')
      } finally {
        this.loading = false
      }
    },
    async fetchProfile() {
      if (!this.token) return
      const user = await authService.profile()
      this.setUser(user)
    },
    async logout() {
      try {
        await authService.logout()
      } finally {
        this.clearSession()
      }
    },
    clearSession() {
      this.token = null
      this.user = null
      this.roles = []
      this.permissions = []
      this.clearTwoFactorChallenge()
      tokenStorage.clear()
    },
  },
})
