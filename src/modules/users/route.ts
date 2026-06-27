import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const userRoutes: RouteRecordRaw[] = [
  { path: 'users', name: 'users.list', component: () => import('@/modules/users/pages/UserListPage.vue'), meta: { title: 'Users', permission: PERMISSIONS.USER_VIEW } },
  { path: 'users/create', name: 'users.create', component: () => import('@/modules/users/pages/UserCreatePage.vue'), meta: { title: 'Create User', permission: PERMISSIONS.USER_CREATE } },
  { path: 'users/:id', name: 'users.detail', component: () => import('@/modules/users/pages/UserDetailPage.vue'), meta: { title: 'User Detail', permission: PERMISSIONS.USER_VIEW } },
  { path: 'users/:id/edit', name: 'users.edit', component: () => import('@/modules/users/pages/UserEditPage.vue'), meta: { title: 'Edit User', permission: PERMISSIONS.USER_UPDATE } },
]
