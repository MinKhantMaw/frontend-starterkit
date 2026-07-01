import { PERMISSIONS } from '@/constants/permissions'

export const permissionRoutes = [
  {
    path: 'permissions',
    name: 'permissions.index',
    component: () => import('@/modules/permissions/pages/PermissionListPage.vue'),
    meta: { title: 'Permissions', permission: PERMISSIONS.PERMISSION_VIEW },
  },
]
