import api from '@/api/http'

function unwrap(response) {
  return response?.data?.data ?? response?.data
}

export const securitySettingsService = {
  async fetchSettings() {
    return unwrap(await api.get('/security-settings'))
  },

  async updateSettings(payload) {
    return unwrap(await api.put('/security-settings', payload))
  },

  async startTwoFactorSetup() {
    return unwrap(await api.get('/security-settings/2fa/setup'))
  },

  async confirmTwoFactor(code) {
    return unwrap(await api.post('/security-settings/2fa/confirm', { code }))
  },

  async disableTwoFactor(password) {
    return unwrap(await api.post('/security-settings/2fa/disable', { password }))
  },
}
