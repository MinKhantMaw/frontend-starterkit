import type { FormRules } from 'element-plus'

export const profileRules: FormRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Enter a valid email address', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'Phone is required', trigger: 'blur' },
    { min: 11, max: 20, message: 'Phone must be 11 to 20 characters', trigger: 'blur' },
  ],
}
