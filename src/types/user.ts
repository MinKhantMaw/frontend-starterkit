export type UserStatus = 'active' | 'inactive' | 'invited'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: string
  status: UserStatus
}

export interface UserCreatePayload {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  role: string
  status: UserStatus
}

export interface UserUpdatePayload {
  name: string
  email: string
  phone: string
  password?: string
  password_confirmation?: string
  role: string
  status: UserStatus
}

export interface UserFilters {
  page?: number
  perPage?: number
  search?: string
  role?: string
  status?: string
}
