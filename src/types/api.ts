export interface PaginationMeta {
  page: number
  perPage: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiErrorBag {
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiListResponse<T> {
  data: T[]
  meta?: PaginationMeta
  message?: string
}

export interface ValidationErrorResponse {
  message?: string
  errors: Record<string, string[]>
}

export interface CrudService<TRecord, TPayload, TParams = Record<string, unknown>> {
  list(params?: TParams): Promise<PaginatedResponse<TRecord>>
  find(id: string | number): Promise<TRecord | undefined>
  create(payload: TPayload): Promise<TRecord>
  update(id: string | number, payload: Partial<TPayload>): Promise<TRecord | undefined>
  remove(id: string | number): Promise<void>
}
