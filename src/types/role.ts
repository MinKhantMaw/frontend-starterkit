export interface Role {
  id: number
  name: string
  key: string
  permissions: string[]
}

export interface RolePayload {
  name: string
  key: string
  permissions: string[]
}

export interface RoleFilters {
  search?: string
}
