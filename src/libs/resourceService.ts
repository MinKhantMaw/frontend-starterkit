import api from '@/libs/http'
import type { AxiosRequestConfig } from 'axios'

export interface ListEnvelope<T> {
  data: T[]
  meta?: { current_page: number; last_page: number; per_page: number; total: number }
}

function unwrap<T>(value: { data?: T } | T): T {
  return typeof value === 'object' && value !== null && 'data' in value
    ? (value as { data: T }).data
    : (value as T)
}

export class ResourceService<T extends { id: number | string }, P extends object = Partial<T>> {
  constructor(private readonly path: string) {}

  async list(params?: Record<string, unknown>): Promise<ListEnvelope<T>> {
    const response = await api.get(this.path, { params })
    const payload = unwrap<ListEnvelope<T> | T[]>(response.data)
    return Array.isArray(payload) ? { data: payload } : payload
  }

  async get(id: T['id']): Promise<T> {
    const response = await api.get(`${this.path}/${id}`)
    return unwrap<T>(response.data)
  }

  async create(payload: P, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.post(this.path, payload, config)
    return unwrap<T>(response.data)
  }

  async update(id: T['id'], payload: P, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.put(`${this.path}/${id}`, payload, config)
    return unwrap<T>(response.data)
  }

  async remove(id: T['id']): Promise<void> { await api.delete(`${this.path}/${id}`) }
  async patch(id: T['id'], action: string, payload?: unknown): Promise<T> {
    const response = await api.patch(`${this.path}/${id}/${action}`, payload)
    return unwrap<T>(response.data)
  }
}
