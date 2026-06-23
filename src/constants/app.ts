export const APP_NAME = 'Enterprise Admin'
export const DEFAULT_PAGE_SIZE = 10

export const USER_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Invited', value: 'invited' },
] as const

export const ROLE_OPTIONS = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Operator', value: 'operator' },
] as const
