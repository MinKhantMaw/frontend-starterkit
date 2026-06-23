export interface LogEntry {
  id: number
  actor: string
  action: string
  module: string
  createdAt: string
}

export interface LogFilters {
  search?: string
}
