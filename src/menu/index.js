import { PERMISSIONS } from '@/constants/permissions';
export const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/dashboard', permission: PERMISSIONS.DASHBOARD_VIEW },
    { label: 'Users', icon: 'pi pi-users', route: '/users', permission: PERMISSIONS.USER_VIEW },
    { label: 'Roles', icon: 'pi pi-shield', route: '/roles', permission: PERMISSIONS.ROLE_VIEW },
    { label: 'Permissions', icon: 'pi pi-key', route: '/permissions', permission: PERMISSIONS.PERMISSION_VIEW },
    { label: 'Profile', icon: 'pi pi-user', route: '/profile', permission: PERMISSIONS.PROFILE_VIEW },
    // { label: 'Audit Logs', icon: 'pi pi-book', route: '/audit-logs', permission: PERMISSIONS.AUDIT_LOG_VIEW },
    // { label: 'Activity Logs', icon: 'pi pi-history', route: '/activity-logs', permission: PERMISSIONS.ACTIVITY_LOG_VIEW },
    // { label: 'Notifications', icon: 'pi pi-bell', route: '/notifications', permission: PERMISSIONS.NOTIFICATION_VIEW },
    { label: 'Security Settings', icon: 'pi pi-lock', route: '/security-settings', permission: PERMISSIONS.SECURITY_SETTING_VIEW },
];
export function resolveMenuForUser(auth) {
    return menuItems.filter((item) => auth.hasPermission(item.permission));
}
