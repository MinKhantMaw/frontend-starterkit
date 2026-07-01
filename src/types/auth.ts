export type RoleKey = 'super_admin' | 'admin' | 'manager' | 'operator' | string

export interface AuthUser {
  id: number | string
  name: string
  email: string
  avatar_path?: string | null
  avatar_url?: string | null
  roles: RoleKey[]
  permissions: string[]
}

export interface LoginPayload {
  email: string
  password: string
  remember?: boolean
}

export interface AuthResponse {
  token?: string
  access_token?: string
  user?: AuthUser
  requires_2fa?: boolean
  temporary_token?: string
}
