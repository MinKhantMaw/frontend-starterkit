import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', name: 'login', component: () => import('@/modules/auth/pages/LoginPage.vue'), meta: { title: 'Login' } },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/modules/auth/pages/ForgotPasswordPage.vue'),
        meta: { title: 'Forgot Password' },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/modules/auth/pages/ResetPasswordPage.vue'),
        meta: { title: 'Reset Password' },
      },
    ],
  },
  { path: '/login', redirect: '/auth/login' },
]
