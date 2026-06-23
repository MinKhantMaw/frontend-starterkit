import type { App } from 'vue'
import type { AxiosError } from 'axios'
import type { Router } from 'vue-router'
import { ElMessage, type FormInstance } from 'element-plus'
import { tokenStorage } from '@/api/tokenStorage'
import { notifyError } from '@/utils/notify'
import type { ApiErrorBag, ValidationErrorResponse } from '@/types/api'

export function registerGlobalErrorHandler(app: App): void {
  app.config.errorHandler = (error) => {
    console.error(error)
    notifyError(error instanceof Error ? error.message : 'Unexpected application error')
  }
}

export function isValidationError(error: unknown): error is AxiosError<ValidationErrorResponse> {
  const axiosError = error as AxiosError<ValidationErrorResponse>
  return axiosError.response?.status === 422 && Boolean(axiosError.response.data?.errors)
}

export function getApiErrorMessage(error: unknown, fallback = 'Request failed'): string {
  const axiosError = error as AxiosError<ApiErrorBag>
  return axiosError.response?.data?.message || axiosError.message || fallback
}

export function mapBackendErrorsToForm(
  error: unknown,
  formRef?: FormInstance,
  setErrors?: (errors: Record<string, string[]>) => void,
): boolean {
  if (!isValidationError(error)) return false

  const errors = error.response?.data?.errors || {}
  setErrors?.(errors)

  Object.keys(errors).forEach((field) => {
    formRef?.validateField(field).catch(() => undefined)
  })

  const firstMessage = Object.values(errors)[0]?.[0]
  if (firstMessage) ElMessage.error(firstMessage)
  return true
}

export function handleApiError(error: unknown, router?: Router): void {
  const axiosError = error as AxiosError<ApiErrorBag>
  const status = axiosError.response?.status

  if (status === 401) {
    tokenStorage.clear()
    window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    router?.push({ name: 'login' })
    return
  }

  if (status === 403) {
    router?.push({ name: 'forbidden' })
    return
  }

  if (status !== 422) {
    ElMessage.error(getApiErrorMessage(error))
  }
}
