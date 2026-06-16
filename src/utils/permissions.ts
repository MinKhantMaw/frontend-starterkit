export function groupPermissionName(name: string): string {
  return name.includes('.') ? name.split('.')[0] : 'general'
}

export function hasPermission(userPermissions: string[], required?: string | string[]) {
  if (!required) return true
  const permissions = Array.isArray(required) ? required : [required]
  return permissions.every((permission) => userPermissions.includes(permission))
}

export function titleCase(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
