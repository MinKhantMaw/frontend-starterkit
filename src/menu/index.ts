import { PERMISSIONS } from '@/constants/permissions'
import type { MenuItem } from '@/types/rbac'

export const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/dashboard', permission: PERMISSIONS.DASHBOARD_VIEW },
  { label: 'Users', icon: 'pi pi-users', route: '/users', permission: PERMISSIONS.USERS_VIEW },
  { label: 'Roles', icon: 'pi pi-shield', route: '/roles', permission: PERMISSIONS.ROLES_VIEW },
  { label: 'Permissions', icon: 'pi pi-key', route: '/permissions', permission: PERMISSIONS.PERMISSIONS_VIEW },
  { label: 'Profile', icon: 'pi pi-user', route: '/profile', permission: PERMISSIONS.PROFILE_VIEW },
  { label: 'Audit Logs', icon: 'pi pi-book', route: '/audit-logs', permission: PERMISSIONS.AUDIT_LOGS_VIEW },
  { label: 'Activity Logs', icon: 'pi pi-history', route: '/activity-logs', permission: PERMISSIONS.ACTIVITY_LOGS_VIEW },
  { label: 'Notifications', icon: 'pi pi-bell', route: '/notifications', permission: PERMISSIONS.NOTIFICATIONS_VIEW },
]

export interface MenuAuthorizer {
  hasPermission(required?: string | string[]): boolean
}

export function resolveMenuForUser(auth: MenuAuthorizer): MenuItem[] {
  return menuItems.filter((item) => auth.hasPermission(item.permission))
}
