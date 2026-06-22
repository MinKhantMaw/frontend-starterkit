import type { RouteRecordRaw } from 'vue-router'

export const permissionRoutes: RouteRecordRaw[] = [
  {
    path: 'permissions',
    name: 'permissions.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Permission List' },
  },
]
