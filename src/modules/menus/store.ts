import { defineStore } from 'pinia'
import { menuService, type Menu, type MenuItem } from './service'

export const useMenuStore = defineStore('menus', {
  state: () => ({ menus: [] as Menu[], loading: false, saving: false }),
  actions: {
    async fetchMenus() {
      this.loading = true
      try { this.menus = (await menuService.list()).data } finally { this.loading = false }
    },
    async updateItems(id: number, items: MenuItem[]) {
      this.saving = true
      try { await menuService.updateItems(id, items) } finally { this.saving = false }
    },
  },
})
