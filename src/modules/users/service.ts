import api from '@/libs/http'
import type { ApiListResponse, PaginationMeta, QueryParams, User } from '@/libs/types'

export interface UserPayload {
  name: string
  email: string
  password?: string
  status: string
  role_id?: number | string
  avatar?: File | string | null
  _method?: string
}

function toFormData(payload: UserPayload) {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value instanceof File ? value : String(value))
    }
  })
  return formData
}

type ApiListResponseWrapper<T> =
  | ApiListResponse<T>
  | { data: ApiListResponse<T> }
  | T[]
  | { data: T[] }
  | { data: { data: T[]; meta?: PaginationMeta } }
  | { data: { items: T[]; meta?: PaginationMeta } }
  | { items: T[]; meta?: PaginationMeta }

function unwrapListResponse<T>(response: ApiListResponseWrapper<T>): ApiListResponse<T> {
  if (Array.isArray(response)) {
    return { data: response }
  }

  if (response && 'items' in response && Array.isArray(response.items)) {
    return {
      data: response.items,
      ...(response.meta ? { meta: response.meta } : {}),
    }
  }

  if (response && 'data' in response && Array.isArray(response.data)) {
    return {
      data: response.data,
      ...(response as { meta?: PaginationMeta }).meta ? { meta: (response as { meta?: PaginationMeta }).meta } : {},
    }
  }

  if (response && 'data' in response && response.data && typeof response.data === 'object') {
    const innerData = response.data as { data?: T[]; items?: T[]; meta?: PaginationMeta }

    if (Array.isArray(innerData.items)) {
      return {
        data: innerData.items,
        ...(innerData.meta ? { meta: innerData.meta } : {}),
      }
    }

    if (Array.isArray(innerData.data)) {
      return {
        data: innerData.data,
        ...(innerData.meta ? { meta: innerData.meta } : {}),
      }
    }
  }

  return response as ApiListResponse<T>
}

export const usersApi = {
  async list(params: QueryParams) {
    const { data } = await api.get<ApiListResponseWrapper<User>>('/users', { params })
    return unwrapListResponse(data)
  },
  async get(id: number | string) {
    const { data } = await api.get<{ data?: User } | User>(`/users/${id}`)
    return 'data' in data && data.data ? data.data : (data as User)
  },
  async create(payload: UserPayload) {
    const { data } = await api.post<{ data?: User } | User>('/users', toFormData(payload))
    return 'data' in data && data.data ? data.data : (data as User)
  },
  async update(id: number | string, payload: UserPayload) {
    const { data } = await api.put<{ data?: User } | User>(`/users/${id}`, toFormData(payload))
    return 'data' in data && data.data ? data.data : (data as User)
  },
  async remove(id: number | string) {
    await api.delete(`/users/${id}`)
  },
  async setStatus(id: number | string, status: string) {
    const { data } = await api.patch<{ data?: User } | User>(`/users/${id}/status`, { status })
    return 'data' in data && data.data ? data.data : (data as User)
  },
  async assignRole(id: number | string, roleId: number | string) {
    const { data } = await api.patch<{ data?: User } | User>(`/users/${id}/assign-role`, { role_id: roleId })
    return 'data' in data && data.data ? data.data : (data as User)
  },
}
