import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { tokenStorage } from '@/api/tokenStorage'
import { useAppStore } from '@/stores/app'
import { handleApiError } from '@/utils/errorHandler'
import type { ApiErrorBag } from '@/types/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  useAppStore().startLoading()
  const token = tokenStorage.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    useAppStore().stopLoading()
    return response
  },
  (error: AxiosError<ApiErrorBag>) => {
    useAppStore().stopLoading()
    const status = error.response?.status

    if (status === 401) {
      tokenStorage.clear()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      if (router.currentRoute.value.name !== 'login') {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
      }
    } else if (status === 403) {
      router.push({ name: 'forbidden' })
    } else {
      handleApiError(error, router)
    }

    return Promise.reject(error)
  },
)

export default api
