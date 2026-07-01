export const PermissionEnum = {
  DASHBOARD_VIEW: 'dashboard.view',
  USER_VIEW: 'user.view',
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  ROLE_VIEW: 'role.view',
  ROLE_CREATE: 'role.create',
  ROLE_UPDATE: 'role.update',
  ROLE_DELETE: 'role.delete',
  PERMISSION_VIEW: 'permission.view',
  PROFILE_VIEW: 'profile.view',
  PROFILE_UPDATE: 'profile.update',
  AUDIT_LOG_VIEW: 'audit_log.view',
  ACTIVITY_LOG_VIEW: 'activity_log.view',
  NOTIFICATION_VIEW: 'notification.view',
  SECURITY_SETTING_VIEW: 'security-setting.view',
  SECURITY_SETTING_UPDATE: 'security-setting.update',
  FILE_UPLOAD: 'file.upload',
} as const

export const PERMISSIONS = PermissionEnum

export type Permission = (typeof PermissionEnum)[keyof typeof PermissionEnum]

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  super_admin: Object.values(PermissionEnum),
  admin: [
    PermissionEnum.DASHBOARD_VIEW,
    PermissionEnum.USER_VIEW,
    PermissionEnum.USER_CREATE,
    PermissionEnum.USER_UPDATE,
    PermissionEnum.USER_DELETE,
    PermissionEnum.ROLE_VIEW,
    PermissionEnum.ROLE_CREATE,
    PermissionEnum.ROLE_UPDATE,
    PermissionEnum.PERMISSION_VIEW,
    PermissionEnum.PROFILE_VIEW,
    PermissionEnum.PROFILE_UPDATE,
    PermissionEnum.AUDIT_LOG_VIEW,
    PermissionEnum.ACTIVITY_LOG_VIEW,
    PermissionEnum.NOTIFICATION_VIEW,
  ],
  editor: [
    PermissionEnum.DASHBOARD_VIEW,
    PermissionEnum.USER_VIEW,
    PermissionEnum.USER_UPDATE,
    PermissionEnum.ROLE_VIEW,
    PermissionEnum.PERMISSION_VIEW,
    PermissionEnum.PROFILE_VIEW,
    PermissionEnum.PROFILE_UPDATE,
  ],
  viewer: [
    PermissionEnum.DASHBOARD_VIEW,
    PermissionEnum.USER_VIEW,
    PermissionEnum.ROLE_VIEW,
    PermissionEnum.PERMISSION_VIEW,
    PermissionEnum.PROFILE_VIEW,
  ],
}
