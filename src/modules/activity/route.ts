import type { RouteRecordRaw } from 'vue-router'

export const activityRoutes: RouteRecordRaw[] = [
  {
    path: 'activity-logs',
    name: 'activity-logs.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Activity Logs', permission: 'activity-log.view' },
  },
]
