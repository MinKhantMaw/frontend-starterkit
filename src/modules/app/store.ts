import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({ pendingRequests: 0, sidebarOpen: false, sidebarCollapsed: false }),
  getters: { loading: (state) => state.pendingRequests > 0 },
  actions: {
    startLoading() { this.pendingRequests += 1 },
    stopLoading() { this.pendingRequests = Math.max(0, this.pendingRequests - 1) },
  },
})
