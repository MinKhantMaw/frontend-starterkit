export type UserStatus = 'active' | 'inactive'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role_id?: number | string
  role_ids?: Array<number | string>
  role?: string
  roles?: string[]
  status: UserStatus
}

export interface UserCreatePayload {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  role_ids: Array<number | string>
  status: UserStatus
}

export interface UserUpdatePayload {
  name: string
  email: string
  phone: string
  password?: string
  password_confirmation?: string
  role_ids: Array<number | string>
  status: UserStatus
}

export interface UserFilters {
  page?: number
  perPage?: number
  search?: string
  role?: string
  status?: string
}
