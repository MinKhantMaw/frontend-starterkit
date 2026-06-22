import api from '@/libs/http'
import type { ApiListResponse, Content, PaginationMeta, QueryParams } from '@/libs/types'

export interface ContentPayload {
  title: string
  slug: string
  excerpt?: string
  body?: string
  featured_image?: File | string | null
  status: string
  published_at?: string | null
}

function toFormData(payload: ContentPayload) {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
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

export const contentsApi = {
  async list(params: QueryParams) {
    const { data } = await api.get<ApiListResponseWrapper<Content>>('/contents', { params })
    return unwrapListResponse(data)
  },
  async get(id: number | string) {
    const { data } = await api.get<{ data?: Content } | Content>(`/contents/${id}`)
    return 'data' in data && data.data ? data.data : (data as Content)
  },
  async create(payload: ContentPayload) {
    const { data } = await api.post<{ data?: Content } | Content>('/contents', toFormData(payload))
    return 'data' in data && data.data ? data.data : (data as Content)
  },
  async update(id: number | string, payload: ContentPayload) {
    const { data } = await api.put<{ data?: Content } | Content>(`/contents/${id}`, toFormData(payload))
    return 'data' in data && data.data ? data.data : (data as Content)
  },
  async remove(id: number | string) {
    await api.delete(`/contents/${id}`)
  },
  async publish(id: number | string) {
    const { data } = await api.patch<{ data?: Content } | Content>(`/contents/${id}/publish`)
    return 'data' in data && data.data ? data.data : (data as Content)
  },
  async unpublish(id: number | string) {
    const { data } = await api.patch<{ data?: Content } | Content>(`/contents/${id}/unpublish`)
    return 'data' in data && data.data ? data.data : (data as Content)
  },
}
