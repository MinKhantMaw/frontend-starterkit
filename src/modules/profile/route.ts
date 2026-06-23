import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const profileRoutes: RouteRecordRaw[] = [
  { path: 'profile', name: 'profile.detail', component: () => import('@/modules/profile/pages/ProfilePage.vue'), meta: { title: 'Profile', permission: PERMISSIONS.PROFILE_VIEW } },
]
