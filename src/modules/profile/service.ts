import api from '@/api/http'
import type { ChangePasswordPayload, Profile, ProfilePayload } from '@/modules/profile/types'

let profile: Profile = {
  id: 1,
  name: 'Enterprise Admin',
  email: 'admin@example.com',
  phone: '+1 555 0100',
  jobTitle: 'System Administrator',
}

export const profileService = {
  async get(): Promise<Profile> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<{ data?: Profile } | Profile>('/profile')
      return ((data as { data?: Profile }).data ?? data) as Profile
    }
    return profile
  },
  async update(payload: ProfilePayload): Promise<Profile> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.put<{ data?: Profile } | Profile>('/profile', payload)
      return ((data as { data?: Profile }).data ?? data) as Profile
    }
    profile = { ...profile, ...payload }
    return profile
  },
  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      await api.put('/profile/password', payload)
    }
  },
}
