import type { RouteRecordRaw } from 'vue-router'

export const errorChildRoutes: RouteRecordRaw[] = [
  { path: '403', name: 'forbidden', component: () => import('@/modules/errors/forbidden/Forbidden.vue'), meta: { title: 'Forbidden' } },
  { path: '500', name: 'server-error', component: () => import('@/views/ServerErrorPage.vue'), meta: { title: 'Server Error' } },
]

export const errorRoutes: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/modules/errors/not-found/NotFound.vue'), meta: { title: 'Not Found' } },
]
