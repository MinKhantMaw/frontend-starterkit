import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const activityLogRoutes: RouteRecordRaw[] = [
  { path: 'activity-logs', name: 'activity-logs.list', component: () => import('@/modules/activity-logs/pages/ActivityLogListPage.vue'), meta: { title: 'Activity Logs', permission: PERMISSIONS.ACTIVITY_LOG_VIEW } },
]
