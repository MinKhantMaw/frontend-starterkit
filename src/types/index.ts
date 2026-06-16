export type Status = 'active' | 'inactive'
export type ContentStatus = 'draft' | 'published' | 'archived'

export interface ApiListResponse<T> {
  data: T[]
  meta?: PaginationMeta
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface AuthUser {
  id: number
  name: string
  email: string
  avatar?: string | null
  roles: string[]
  permissions: string[]
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string | null
  status: Status
  role?: Role | string | null
  roles?: Role[]
  created_at?: string
}

export interface Role {
  id: number
  name: string
  guard_name?: string
  permissions?: Permission[]
  users_count?: number
  created_at?: string
}

export interface Permission {
  id: number
  name: string
  module?: string
}

export interface Content {
  id: number
  title: string
  slug: string
  excerpt?: string
  body?: string
  featured_image?: string | null
  status: ContentStatus
  published_at?: string | null
  created_at?: string
}

export interface DashboardStats {
  total_users: number
  active_users: number
  total_roles: number
  total_permissions: number
  total_contents: number
  published_contents: number
  draft_contents: number
  recent_users: User[]
  recent_contents: Content[]
}

export interface QueryParams {
  page?: number
  per_page?: number
  search?: string
  status?: string
  role_id?: string | number
  date_from?: string
  date_to?: string
}
