import api from '@/api/http'

function unwrapPayload(response) {
  return response?.data?.data ?? response?.data ?? {}
}

function unwrapUser(response) {
  const payload = unwrapPayload(response)
  return payload.user ?? payload
}

export const authService = {
  async login(payload) {
    return unwrapPayload(await api.post('/auth/login', payload))
  },

  async verifyTwoFactor(payload) {
    return unwrapPayload(await api.post('/auth/2fa/challenge', payload))
  },

  async profile() {
    return unwrapUser(await api.get('/auth/me'))
  },

  async logout() {
    await api.post('/auth/logout')
  },

  async logoutAll() {
    await api.post('/auth/logout-all')
  },

  async forgotPassword(payload) {
    return (await api.post('/auth/forgot-password', payload)).data
  },

  async resetPassword(payload) {
    return (await api.post('/auth/reset-password', payload)).data
  },
}
