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
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
  password_confirmation: [
    { required: true, message: 'Password confirmation is required', trigger: 'blur' },
    { validator: matchesPassword, trigger: 'blur' },
  ],
  role_ids: [{ type: 'array', required: true, min: 1, message: 'Select at least one role', trigger: 'change' }],
  status: [{ required: true, message: 'Status is required', trigger: 'change' }],
}

export const userUpdateRules: FormRules = {
  name: userCreateRules.name,
  email: userCreateRules.email,
  password: [{ min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }],
  password_confirmation: [{ validator: matchesPassword, trigger: 'blur' }],
  role_ids: userCreateRules.role_ids,
  status: userCreateRules.status,
}
