import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loadingCount: 0,
    darkMode: false,
  }),
  getters: {
    isLoading: (state) => state.loadingCount > 0,
  },
  actions: {
    startLoading(): void {
      this.loadingCount += 1
    },
    stopLoading(): void {
      this.loadingCount = Math.max(0, this.loadingCount - 1)
    },
    toggleDarkMode(): void {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
  },
})
