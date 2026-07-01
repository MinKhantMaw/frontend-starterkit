import { defineStore } from 'pinia'
import { securitySettingsService } from '@/modules/security-settings/services/securitySettingsService'
import { notifySuccess } from '@/utils/notify'

function normalizeSettings(settings) {
  return settings || { admin_two_factor_enabled: false }
}

export const useSecuritySettingsStore = defineStore('securitySettings', {
  state: () => ({
    settings: null,
    loading: false,
    setupData: null,
  }),
  getters: {
    isTwoFactorEnabled: (state) => Boolean(state.settings?.admin_two_factor_enabled ?? state.settings?.two_factor_enabled),
  },
  actions: {
    async fetchSettings() {
      this.loading = true
      try {
        this.settings = normalizeSettings(await securitySettingsService.fetchSettings())
      } finally {
        this.loading = false
      }
    },

    async startTwoFactorSetup() {
      this.loading = true
      try {
        this.setupData = await securitySettingsService.startTwoFactorSetup()
        return this.setupData
      } finally {
        this.loading = false
      }
    },

    async confirmTwoFactor(code) {
      this.loading = true
      try {
        await securitySettingsService.confirmTwoFactor(code)
        notifySuccess('Admin 2FA Enabled')
        this.setupData = null
        await this.fetchSettings()
      } finally {
        this.loading = false
      }
    },

    async disableTwoFactor(password) {
      this.loading = true
      try {
        await securitySettingsService.disableTwoFactor(password)
        notifySuccess('Admin 2FA Disabled')
        await this.fetchSettings()
      } finally {
        this.loading = false
      }
    },
  },
})
