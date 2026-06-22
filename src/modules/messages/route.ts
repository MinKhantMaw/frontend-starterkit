import type { RouteRecordRaw } from 'vue-router'

export const messageRoutes: RouteRecordRaw[] = [
  {
    path: 'contact-messages',
    name: 'contact-messages.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Contact Messages', permission: 'contact-message.view' },
  },
]
