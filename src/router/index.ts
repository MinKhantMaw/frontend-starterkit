import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    permission?: string | string[]
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/',
    component: () => import('@/components/layout/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'users',
        name: 'users.index',
        component: () => import('@/views/users/UserListView.vue'),
        meta: { title: 'User Management', permission: 'user.view' },
      },
      {
        path: 'users/create',
        name: 'users.create',
        component: () => import('@/views/users/UserFormView.vue'),
        meta: { title: 'Create User', permission: 'user.create' },
      },
      {
        path: 'users/:id',
        name: 'users.show',
        component: () => import('@/views/users/UserDetailView.vue'),
        meta: { title: 'User Detail', permission: 'user.view' },
      },
      {
        path: 'users/:id/edit',
        name: 'users.edit',
        component: () => import('@/views/users/UserFormView.vue'),
        meta: { title: 'Edit User', permission: 'user.update' },
      },
      {
        path: 'roles',
        name: 'roles.index',
        component: () => import('@/views/roles/RoleListView.vue'),
        meta: { title: 'Role Management', permission: 'role.view' },
      },
      {
        path: 'roles/create',
        name: 'roles.create',
        component: () => import('@/views/roles/RoleFormView.vue'),
        meta: { title: 'Create Role', permission: 'role.create' },
      },
      {
        path: 'roles/:id',
        name: 'roles.show',
        component: () => import('@/views/roles/RoleDetailView.vue'),
        meta: { title: 'Role Detail', permission: 'role.view' },
      },
      {
        path: 'roles/:id/edit',
        name: 'roles.edit',
        component: () => import('@/views/roles/RoleFormView.vue'),
        meta: { title: 'Edit Role', permission: 'role.update' },
      },
      {
        path: 'permissions',
        name: 'permissions.index',
        component: () => import('@/views/permissions/PermissionListView.vue'),
        meta: { title: 'Permission List' },
      },
      {
        path: 'contents',
        name: 'contents.index',
        component: () => import('@/views/contents/ContentListView.vue'),
        meta: { title: 'Content Management', permission: 'content.view' },
      },
      {
        path: 'contents/create',
        name: 'contents.create',
        component: () => import('@/views/contents/ContentFormView.vue'),
        meta: { title: 'Create Content', permission: 'content.create' },
      },
      {
        path: 'contents/:id',
        name: 'contents.show',
        component: () => import('@/views/contents/ContentDetailView.vue'),
        meta: { title: 'Content Detail', permission: 'content.view' },
      },
      {
        path: 'contents/:id/edit',
        name: 'contents.edit',
        component: () => import('@/views/contents/ContentFormView.vue'),
        meta: { title: 'Edit Content', permission: 'content.update' },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/ProfileView.vue'),
        meta: { title: 'Profile' },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/settings/SettingsView.vue'),
        meta: { title: 'Settings' },
      },
      {
        path: '403',
        name: 'forbidden',
        component: () => import('@/views/errors/ForbiddenView.vue'),
        meta: { title: 'Permission Denied' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: { title: 'Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !auth.token) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.token) {
    return { name: 'dashboard' }
  }

  if (requiresAuth && auth.token && !auth.user) {
    try {
      await auth.fetchProfile()
    } catch {
      auth.clearSession()
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }

  const requiredPermission = to.matched.find((record) => record.meta.permission)?.meta.permission
  if (requiredPermission && !auth.can(requiredPermission)) {
    return { name: 'forbidden' }
  }

  document.title = `${to.meta.title ?? 'Admin'} | CMS`
})

window.addEventListener('auth:unauthorized', () => {
  const auth = useAuthStore()
  auth.clearSession()
})

export default router
