import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { tokenStorage } from '@/utils/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || 'Something went wrong'

    if (status === 401) {
      tokenStorage.clear()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      if (router.currentRoute.value.name !== 'login') {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
      }
    } else if (status !== 422) {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  },
)

export default api
