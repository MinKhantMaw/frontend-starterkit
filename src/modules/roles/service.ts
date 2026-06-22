import api from '@/libs/http'
import type { ApiListResponse, PaginationMeta, QueryParams, Role } from '@/libs/types'

export interface RolePayload {
  name: string
  permissions: string[]
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

export const rolesApi = {
  async list(params: QueryParams = {}) {
    const { data } = await api.get<ApiListResponseWrapper<Role>>('/roles', { params })
    return unwrapListResponse(data)
  },
  async get(id: number | string) {
    const { data } = await api.get<{ data?: Role } | Role>(`/roles/${id}`)
    return 'data' in data && data.data ? data.data : (data as Role)
  },
  async create(payload: RolePayload) {
    const { data } = await api.post<{ data?: Role } | Role>('/roles', { name: payload.name })
    return 'data' in data && data.data ? data.data : (data as Role)
  },
  async update(id: number | string, payload: RolePayload) {
    const { data } = await api.put<{ data?: Role } | Role>(`/roles/${id}`, { name: payload.name })
    return 'data' in data && data.data ? data.data : (data as Role)
  },
  async remove(id: number | string) {
    await api.delete(`/roles/${id}`)
  },
  async assignPermissions(id: number | string, permissions: string[]) {
    const { data } = await api.patch<{ data?: Role } | Role>(`/roles/${id}/permissions`, { permissions })
    return 'data' in data && data.data ? data.data : (data as Role)
  },
}
