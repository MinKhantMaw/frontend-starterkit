import type { Router } from 'vue-router'
import { APP_NAME } from '@/constants/app'
import { useAuthStore } from '@/modules/auth/store'

const guestRouteNames = ['login', 'forgot-password', 'reset-password']
const twoFactorRouteName = 'two-factor-challenge'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    permission?: string | string[]
    role?: string | string[]
    title?: string
  }
}

export function applyRouteGuards(router: Router): void {
  router.beforeEach(async (to) => {
    const auth = useAuthStore()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    if (String(to.name) === twoFactorRouteName) {
      if (auth.isAuthenticated) return { name: 'dashboard' }
      if (!auth.temporaryTwoFactorToken) return { name: 'login' }
    }

    if (requiresAuth && !auth.isAuthenticated) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }

    if (guestRouteNames.includes(String(to.name)) && auth.isAuthenticated) {
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

    const permission = to.matched.find((record) => record.meta.permission)?.meta.permission
    if (permission && !auth.hasPermission(permission)) {
      return { name: 'forbidden' }
    }

    const role = to.matched.find((record) => record.meta.role)?.meta.role
    if (role && !auth.hasRole(role)) {
      return { name: 'forbidden' }
    }

    document.title = `${to.meta.title || 'Admin'} | ${APP_NAME}`
  })

  window.addEventListener('auth:unauthorized', () => {
    useAuthStore().clearSession()
  })
}
