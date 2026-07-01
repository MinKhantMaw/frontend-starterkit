import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const securitySettingsRoutes: RouteRecordRaw[] = [
  {
    path: 'security-settings',
    name: 'security-settings',
    component: () => import('@/modules/security-settings/pages/SecuritySettingsView.vue'),
    meta: { title: 'Security Settings', permission: PERMISSIONS.SECURITY_SETTING_VIEW },
  },
]
