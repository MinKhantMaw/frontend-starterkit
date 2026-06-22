import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./login/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('./forgot-password/ForgotPassword.vue'),
    meta: { title: 'Forgot Password' },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('./reset-password/ResetPassword.vue'),
    meta: { title: 'Reset Password' },
  },
]
