import type { RouteRecordRaw } from 'vue-router'

export const notificationRoutes: RouteRecordRaw[] = [
  {
    path: 'notifications',
    name: 'notifications.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Notifications' },
  },
]
