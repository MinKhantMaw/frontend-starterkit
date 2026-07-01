import api from '@/api/http'

function unwrapProfile(response) {
  const payload = response?.data?.data ?? response?.data ?? {}
  return payload.user ?? payload
}

export const profileService = {
  async get() {
    return unwrapProfile(await api.get('/profile'))
  },

  async update(payload) {
    return unwrapProfile(await api.put('/profile', payload))
  },

  async uploadAvatar(file) {
    const formData = new window.FormData()
    formData.append('avatar', file)

    return unwrapProfile(
      await api.post('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
  },

  async changePassword(payload) {
    await api.put('/profile/password', payload)
  },
}
