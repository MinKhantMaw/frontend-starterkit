export function hasRole(userRoles: string[], required?: string | string[]): boolean {
  if (!required) return true
  const requiredRoles = Array.isArray(required) ? required : [required]
  return requiredRoles.some((role) => userRoles.includes(role))
}

export function hasPermission(userPermissions: string[], userRoles: string[], required?: string | string[]): boolean {
  if (!required) return true
  if (userRoles.includes('super_admin')) return true
  const requiredPermissions = Array.isArray(required) ? required : [required]
  return requiredPermissions.every((permission) => userPermissions.includes(permission))
}
