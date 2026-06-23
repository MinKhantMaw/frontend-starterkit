import type { FormRules } from 'element-plus'

function matchesPassword(_rule: unknown, value: string, callback: (error?: Error) => void, source: Record<string, string>): void {
  if (source.password && value !== source.password) {
    callback(new Error('Password confirmation must match'))
    return
  }
  callback()
}

export const userCreateRules: FormRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Enter a valid email address', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'Phone is required', trigger: 'blur' },
    { min: 11, max: 20, message: 'Phone must be 11 to 20 characters', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, max: 15, message: 'Password must be 6 to 15 characters', trigger: 'blur' },
  ],
  password_confirmation: [
    { required: true, message: 'Password confirmation is required', trigger: 'blur' },
    { validator: matchesPassword, trigger: 'blur' },
  ],
  role: [{ required: true, message: 'Role is required', trigger: 'change' }],
  status: [{ required: true, message: 'Status is required', trigger: 'change' }],
}

export const userUpdateRules: FormRules = {
  name: userCreateRules.name,
  email: userCreateRules.email,
  phone: userCreateRules.phone,
  password: [{ min: 6, max: 15, message: 'Password must be 6 to 15 characters', trigger: 'blur' }],
  password_confirmation: [{ validator: matchesPassword, trigger: 'blur' }],
  role: userCreateRules.role,
  status: userCreateRules.status,
}
