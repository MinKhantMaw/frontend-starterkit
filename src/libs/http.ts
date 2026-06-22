import axios, { AxiosError } from 'axios'
import router from '@/router'
import { tokenStorage } from '@/libs/auth'
import { useAppStore } from '@/modules/app/store'
import { notify } from '@/libs/notify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1/admin',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  useAppStore().startLoading()
  const token = tokenStorage.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => { useAppStore().stopLoading(); return response },
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    useAppStore().stopLoading()
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || 'Something went wrong'

    if (status === 401) {
      tokenStorage.clear()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      if (router.currentRoute.value.name !== 'login') {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
      }
    } else if (status !== 422) {
      notify('error', 'Request failed', message)
    }

    return Promise.reject(error)
  },
)

export default api
