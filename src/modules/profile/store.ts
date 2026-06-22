import { defineStore } from 'pinia'
import { profileService, type ProfilePayload } from './service'

export const useProfileStore = defineStore('profile', {
  state: () => ({ saving: false }),
  actions: {
    async updateProfile(payload: ProfilePayload) {
      this.saving = true
      try { await profileService.update(payload) } finally { this.saving = false }
    },
  },
})
