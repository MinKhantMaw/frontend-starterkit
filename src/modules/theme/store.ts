import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({ theme: (localStorage.getItem('cms-theme') as Theme) || 'light' }),
  actions: {
    apply() { document.documentElement.classList.toggle('dark', this.theme === 'dark') },
    toggle() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('cms-theme', this.theme)
      this.apply()
    },
  },
})
