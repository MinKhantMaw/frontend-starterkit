import api from '@/api/http'
import { ROLE_PERMISSIONS } from '@/constants/permissions'
import type { ApiResponse } from '@/types/api'
import type { AuthResponse, AuthUser, LoginPayload } from '@/types/auth'

const demoUser: AuthUser = {
  id: 1,
  name: 'Enterprise Admin',
  email: 'admin@example.com',
  roles: ['Super Admin'],
  permissions: ROLE_PERMISSIONS.super_admin,
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<ApiResponse<AuthResponse> | AuthResponse>('/auth/login', payload)
    return ((data as ApiResponse<AuthResponse>).data ?? data) as AuthResponse
  },

  async profile(): Promise<AuthUser> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<{ data?: AuthUser } | AuthUser>('/auth/me')
      return ((data as { data?: AuthUser }).data ?? data) as AuthUser
    }

    return demoUser
  },

  async logout(): Promise<void> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      await api.post('/auth/logout')
    }
  },

  async forgotPassword(payload: { email: string }): Promise<{ message: string }> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.post<{ message: string }>('/auth/forgot-password', payload)
      return data
    }

    return { message: 'Password reset instructions sent.' }
  },

  async resetPassword(payload: {
    email: string
    token: string
    password: string
    password_confirmation: string
  }): Promise<{ message: string }> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.post<{ message: string }>('/auth/reset-password', payload)
      return data
    }

    return { message: 'Password reset complete.' }
  },
}
