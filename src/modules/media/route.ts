import type { RouteRecordRaw } from 'vue-router'

export const mediaRoutes: RouteRecordRaw[] = [
  {
    path: 'media',
    name: 'media.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Media Library', permission: 'media.view' },
  },
]
