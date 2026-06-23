import type { FormRules } from 'element-plus'

export const permissionRules: FormRules = {
  name: [{ required: true, message: 'Permission name is required', trigger: 'blur' }],
  module: [{ required: true, message: 'Module is required', trigger: 'blur' }],
}
