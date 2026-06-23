export interface PermissionRecord {
  id: number
  name: string
  module: string
}

export interface PermissionPayload {
  name: string
  module: string
}

export interface PermissionFilters {
  search?: string
}
