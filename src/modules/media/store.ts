import { defineStore } from 'pinia'
import { mediaService, type Media } from './service'

export const useMediaStore = defineStore('media', {
  state: () => ({ items: [] as Media[], loading: false }),
  actions: {
    async fetchMedia() {
      this.loading = true
      try { this.items = (await mediaService.list()).data } finally { this.loading = false }
    },
    upload(data: FormData) { return mediaService.upload(data) },
    remove(id: number) { return mediaService.remove(id) },
  },
})
