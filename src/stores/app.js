import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', {
    state: () => ({
        loadingCount: 0,
        darkMode: false,
    }),
    getters: {
        isLoading: (state) => state.loadingCount > 0,
    },
    actions: {
        startLoading() {
            this.loadingCount += 1;
        },
        stopLoading() {
            this.loadingCount = Math.max(0, this.loadingCount - 1);
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            document.documentElement.classList.toggle('dark', this.darkMode);
        },
    },
});
