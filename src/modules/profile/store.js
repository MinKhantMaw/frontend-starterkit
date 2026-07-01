import { defineStore } from 'pinia'
import { profileService } from './service.js'
import { useAuthStore } from '@/modules/auth/store'
import { notifySuccess } from '@/utils/notify'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false,
    saving: false,
    uploadingAvatar: false,
    validationErrors: {},
  }),
  actions: {
    syncAuthUser(user) {
      if (!user) return
      useAuthStore().setUser(user)
    },

    async fetchProfile() {
      this.loading = true
      try {
        this.profile = await profileService.get()
        this.syncAuthUser(this.profile)
      } finally {
        this.loading = false
      }
    },

    async updateProfile(payload) {
      this.saving = true
      this.validationErrors = {}
      try {
        this.profile = await profileService.update(payload)
        this.syncAuthUser(this.profile)
        notifySuccess('Profile updated')
      } finally {
        this.saving = false
      }
    },

    async uploadAvatar(file) {
      this.uploadingAvatar = true
      try {
        this.profile = await profileService.uploadAvatar(file)
        this.syncAuthUser(this.profile)
        notifySuccess('Avatar uploaded successfully')
      } finally {
        this.uploadingAvatar = false
      }
    },

    async changePassword(payload) {
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
