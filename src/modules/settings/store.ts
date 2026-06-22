import { defineStore } from 'pinia'
import { settingsService, type SettingsPayload } from './service'

export const useSettingsStore = defineStore('settings', {
  state: () => ({ settings: null as SettingsPayload | null, loading: false, saving: false }),
  actions: {
    async fetchSettings() {
      this.loading = true
      try { this.settings = await settingsService.get() } finally { this.loading = false }
    },
    async updateSettings(payload: SettingsPayload, logo?: File, favicon?: File) {
      this.saving = true
      try { await settingsService.update(payload, logo, favicon) } finally { this.saving = false }
    },
  },
})
