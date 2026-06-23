import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const permissionRoutes: RouteRecordRaw[] = [
  { path: 'permissions', name: 'permissions.list', component: () => import('@/modules/permissions/pages/PermissionListPage.vue'), meta: { title: 'Permissions', permission: PERMISSIONS.PERMISSIONS_VIEW } },
]
