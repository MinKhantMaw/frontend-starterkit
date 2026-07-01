export const roleRules = {
    name: [{ required: true, message: 'Role name is required', trigger: 'blur' }],
    permissions: [{ type: 'array', required: true, min: 1, message: 'Select at least one permission', trigger: 'change' }],
};
