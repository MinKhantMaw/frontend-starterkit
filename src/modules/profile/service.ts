import api from '@/libs/http'

export interface ProfilePayload {
  name: string
  email: string
  phone: string
  avatar?: File
}

export const profileService = {
  update(payload: ProfilePayload) {
    const data = new FormData()
    data.append('name', payload.name)
    data.append('email', payload.email)
    data.append('phone', payload.phone)
    if (payload.avatar) data.append('avatar', payload.avatar)
    data.append('_method', 'PUT')
    return api.post('/profile', data)
  },
}
