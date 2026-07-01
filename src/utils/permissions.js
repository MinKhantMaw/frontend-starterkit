export function hasRole(userRoles, required) {
    if (!required)
        return true;
    const requiredRoles = Array.isArray(required) ? required : [required];
    return requiredRoles.some((role) => userRoles.includes(role));
}
export function hasPermission(userPermissions, userRoles, required) {
    if (!required)
        return true;
    if (userRoles.includes('Super Admin') || userRoles.includes('super_admin'))
        return true;
    const requiredPermissions = Array.isArray(required) ? required : [required];
    return requiredPermissions.every((permission) => userPermissions.includes(permission));
}
