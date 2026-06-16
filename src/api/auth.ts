import api from './http'
import type { AuthUser } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token?: string
  access_token?: string
  user?: AuthUser
}

export interface ChangePasswordPayload {
  current_password: string
  password: string
  password_confirmation: string
}

type ApiResponse<T extends object> = { data?: T } | T

function unwrapResponse<T extends object>(data: ApiResponse<T>): T {
  return 'data' in data && data.data ? data.data : (data as T)
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/login', payload)
    return unwrapResponse(data)
  },
  async logout() {
    await api.post('/logout')
  },
  async profile() {
    const { data } = await api.get<{ data?: AuthUser } | AuthUser>('/profile')
    return 'data' in data && data.data ? data.data : (data as AuthUser)
  },
  async changePassword(payload: ChangePasswordPayload) {
    await api.post('/change-password', payload)
  },
}
