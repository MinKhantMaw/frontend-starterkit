import type { RouteRecordRaw } from 'vue-router'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'menus',
    name: 'menus.index',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Menu Builder', permission: 'menu.view' },
  },
]
