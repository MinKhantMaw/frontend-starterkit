import api from '@/api/http'
import type { CrudService, PaginatedResponse } from '@/types/api'

export function createCrudService<TRecord, TPayload, TParams = Record<string, unknown>>(
  resource: string,
): CrudService<TRecord, TPayload, TParams> {
  return {
    async list(params?: TParams): Promise<PaginatedResponse<TRecord>> {
      const { data } = await api.get(resource, { params })
      return data
    },
    async find(id: string | number): Promise<TRecord> {
      const { data } = await api.get(`${resource}/${id}`)
      return data.data || data
    },
    async create(payload: TPayload): Promise<TRecord> {
      const { data } = await api.post(resource, payload)
      return data.data || data
    },
    async update(id: string | number, payload: Partial<TPayload>): Promise<TRecord> {
      const { data } = await api.put(`${resource}/${id}`, payload)
      return data.data || data
    },
    async remove(id: string | number): Promise<void> {
      await api.delete(`${resource}/${id}`)
    },
  }
}
