import api from '@/libs/http'
import type { AuthUser } from '@/libs/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token?: string
  access_token?: string
  user?: AuthUser
  roles?: string[]
  permissions?: string[]
}

export interface ChangePasswordPayload {
  current_password: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}

type ApiResponse<T> = { data?: T } | T

function unwrapResponse<T>(response: ApiResponse<T>): any {
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as any).data
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return { ...(response as any), ...data }
    }
    return data
  }
  return response
}

function normalizeAuthUser(payload: any): AuthUser {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid profile response')
  }

  const user = payload.user ?? (payload.data && typeof payload.data === 'object' ? payload.data : payload)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar ?? user.avatar_url ?? null,
    roles: Array.isArray(user.roles) ? user.roles : [],
    permissions: Array.isArray(user.permissions) ? user.permissions : [],
  }
}

function normalizeLoginResponse(payload: any): LoginResponse {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  const top = payload.data && typeof payload.data === 'object' ? { ...(payload as any), ...(payload as any).data } : payload

  return {
    token: top.token ?? top.access_token ?? top.accessToken,
    access_token: top.access_token ?? top.token ?? top.accessToken,
    user: top.user ?? (top.data && typeof top.data === 'object' ? top.data.user ?? top.data : undefined),
    roles: Array.isArray(top.roles) ? top.roles : Array.isArray(top.user?.roles) ? top.user.roles : [],
    permissions: Array.isArray(top.permissions) ? top.permissions : Array.isArray(top.user?.permissions) ? top.user.permissions : [],
  }
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/login', payload)
    return normalizeLoginResponse(unwrapResponse(data))
  },
  async logout() {
    await api.post('/logout')
  },
  async profile() {
    const { data } = await api.get<ApiResponse<AuthUser | { user?: AuthUser }>>('/profile')
    return normalizeAuthUser(unwrapResponse(data))
  },
  async changePassword(payload: ChangePasswordPayload) {
    await api.post('/change-password', payload)
  },
  async forgotPassword(email: string) {
    await api.post('/forgot-password', { email })
  },
  async resetPassword(payload: ResetPasswordPayload) {
    await api.post('/reset-password', payload)
  },
}
