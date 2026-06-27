export const APP_NAME = 'Enterprise Admin'
export const DEFAULT_PAGE_SIZE = 10

export const USER_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
] as const

export const ROLE_OPTIONS = [
  { label: 'Admin', value: 2 },
  { label: 'Editor', value: 3 },
  { label: 'Viewer', value: 4 },
] as const
