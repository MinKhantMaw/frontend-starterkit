import type { FormRules } from 'element-plus'

export const roleRules: FormRules = {
  name: [{ required: true, message: 'Role name is required', trigger: 'blur' }],
  key: [{ required: true, message: 'Role key is required', trigger: 'blur' }],
  permissions: [{ type: 'array', required: true, min: 1, message: 'Select at least one permission', trigger: 'change' }],
}
