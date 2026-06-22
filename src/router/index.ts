import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { activityRoutes } from '@/modules/activity/route'
import { authRoutes } from '@/modules/auth/route'
import { useAuthStore } from '@/modules/auth/store'
import { contentRoutes } from '@/modules/content/route'
import { contentManagementRoutes } from '@/modules/contents/route'
import { dashboardRoutes } from '@/modules/dashboard/route'
import { errorChildRoutes, errorRoutes } from '@/modules/errors/route'
import { mediaRoutes } from '@/modules/media/route'
import { menuRoutes } from '@/modules/menus/route'
import { messageRoutes } from '@/modules/messages/route'
import { notificationRoutes } from '@/modules/notifications/route'
import { permissionRoutes } from '@/modules/permissions/route'
import { profileRoutes } from '@/modules/profile/route'
import { roleRoutes } from '@/modules/roles/route'
import { settingsRoutes } from '@/modules/settings/route'
import { taxonomyRoutes } from '@/modules/taxonomy/route'
import { userRoutes } from '@/modules/users/route'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    permission?: string | string[]
    title?: string
  }
}

const adminRoutes: RouteRecordRaw[] = [
  { path: '', redirect: '/dashboard' },
  ...dashboardRoutes,
  ...userRoutes,
  ...roleRoutes,
  ...permissionRoutes,
  ...contentManagementRoutes,
  ...contentRoutes,
  ...taxonomyRoutes,
  ...mediaRoutes,
  ...menuRoutes,
  ...messageRoutes,
  ...notificationRoutes,
  ...activityRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  ...errorChildRoutes,
]

const routes: RouteRecordRaw[] = [
  ...authRoutes,
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: adminRoutes,
  },
  ...errorRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (['login', 'forgot-password', 'reset-password'].includes(String(to.name)) && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }

  if (requiresAuth && auth.isAuthenticated && !auth.user) {
    try {
      await auth.fetchProfile()
    } catch {
      auth.clearSession()
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }

  const permissionMeta = to.matched.find((record) => record.meta.permission)?.meta.permission
  if (permissionMeta && !auth.hasPermission(permissionMeta)) {
    return { name: 'forbidden' }
  }

  document.title = `${to.meta.title ?? 'Admin'} | Nexus CMS`
})

window.addEventListener('auth:unauthorized', () => {
  const auth = useAuthStore()
  auth.clearSession()
})

export default router
