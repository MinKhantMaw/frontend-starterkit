import { reactive } from 'vue'

export type FormErrors = Record<string, string[]>

export function useFormErrors() {
  const errors = reactive<FormErrors>({})

  function setErrors(newErrors: FormErrors): void {
    clearErrors()
    Object.entries(newErrors).forEach(([field, messages]) => {
      errors[field] = messages
    })
  }

  function clearErrors(): void {
    Object.keys(errors).forEach((field) => {
      delete errors[field]
    })
  }

  function getError(field: string): string {
    return errors[field]?.[0] || ''
  }

  function hasError(field: string): boolean {
    return Boolean(getError(field))
  }

  return { errors, setErrors, clearErrors, getError, hasError }
}
