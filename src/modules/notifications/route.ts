import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const notificationRoutes: RouteRecordRaw[] = [
  { path: 'notifications', name: 'notifications.list', component: () => import('@/modules/notifications/pages/NotificationListPage.vue'), meta: { title: 'Notifications', permission: PERMISSIONS.NOTIFICATIONS_VIEW } },
]
