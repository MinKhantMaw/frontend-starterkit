import type { RouteRecordRaw } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'

export const roleRoutes: RouteRecordRaw[] = [
  { path: 'roles', name: 'roles.list', component: () => import('@/modules/roles/pages/RoleListPage.vue'), meta: { title: 'Roles', permission: PERMISSIONS.ROLES_VIEW } },
  { path: 'roles/create', name: 'roles.create', component: () => import('@/modules/roles/pages/RoleCreatePage.vue'), meta: { title: 'Create Role', permission: PERMISSIONS.ROLES_CREATE } },
  { path: 'roles/:id', name: 'roles.detail', component: () => import('@/modules/roles/pages/RoleDetailPage.vue'), meta: { title: 'Role Detail', permission: PERMISSIONS.ROLES_VIEW } },
  { path: 'roles/:id/edit', name: 'roles.edit', component: () => import('@/modules/roles/pages/RoleEditPage.vue'), meta: { title: 'Edit Role', permission: PERMISSIONS.ROLES_UPDATE } },
]
