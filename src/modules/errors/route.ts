import type { RouteRecordRaw } from 'vue-router'

export const errorChildRoutes: RouteRecordRaw[] = [
  {
    path: '403',
    name: 'forbidden',
    component: () => import('./forbidden/Forbidden.vue'),
    meta: { title: 'Permission Denied' },
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./not-found/NotFound.vue'),
    meta: { title: 'Not Found' },
  },
]
