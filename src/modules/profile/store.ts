import { defineStore } from 'pinia'
import { profileService } from './service'
import { notifySuccess } from '@/utils/notify'
import type { ChangePasswordPayload, Profile, ProfilePayload } from '@/modules/profile/types'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as Profile | null,
    loading: false,
    saving: false,
    validationErrors: {} as Record<string, string[]>,
  }),
  actions: {
    async fetchProfile(): Promise<void> {
      this.loading = true
      try {
        this.profile = await profileService.get()
      } finally {
        this.loading = false
      }
    },
    async updateProfile(payload: ProfilePayload): Promise<void> {
      this.saving = true
      this.validationErrors = {}
      try {
        this.profile = await profileService.update(payload)
        notifySuccess('Profile updated')
      } finally {
        this.saving = false
      }
    },
    async changePassword(payload: ChangePasswordPayload): Promise<void> {
      this.saving = true
      try {
        await profileService.changePassword(payload)
        notifySuccess('Password changed')
      } finally {
        this.saving = false
      }
    },
  },
})
