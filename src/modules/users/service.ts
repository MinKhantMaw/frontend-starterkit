import api from '@/api/http'
import type { PaginatedResponse } from '@/types/api'
import type { User, UserCreatePayload, UserFilters, UserUpdatePayload } from '@/modules/users/types'

let users: User[] = [
  { id: 1, name: 'Enterprise Admin', email: 'admin@example.com', role: 'admin', status: 'active', phone: '+1 555 0100' },
  { id: 2, name: 'Operations Manager', email: 'manager@example.com', role: 'manager', status: 'active', phone: '+1 555 0101' },
  { id: 3, name: 'Front Desk Operator', email: 'operator@example.com', role: 'operator', status: 'invited', phone: '+1 555 0102' },
]

function paginate(items: User[], page: number, perPage: number): PaginatedResponse<User> {
  const start = (page - 1) * perPage
  return { data: items.slice(start, start + perPage), meta: { page, perPage, total: items.length } }
}

function filterUsers(params: UserFilters = {}): User[] {
  return users.filter((user) => {
    const search = params.search?.toLowerCase()
    const matchesSearch = !search || [user.name, user.email, user.phone].some((value) => value?.toLowerCase().includes(search))
    const matchesRole = !params.role || user.role === params.role
    const matchesStatus = !params.status || user.status === params.status
    return matchesSearch && matchesRole && matchesStatus
  })
}

export const userService = {
  async list(params: UserFilters = {}): Promise<PaginatedResponse<User>> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<PaginatedResponse<User>>('/users', { params })
      return data
    }
    return paginate(filterUsers(params), Number(params.page || 1), Number(params.perPage || 10))
  },
  async find(id: string | number): Promise<User | undefined> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<{ data?: User } | User>(`/users/${id}`)
      return ((data as { data?: User }).data ?? data) as User
    }
    return users.find((user) => String(user.id) === String(id))
  },
  async create(payload: UserCreatePayload): Promise<User> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.post<{ data?: User } | User>('/users', payload)
      return ((data as { data?: User }).data ?? data) as User
    }
    const user: User = { ...payload, id: Date.now() }
    users = [user, ...users]
    return user
  },
  async update(id: string | number, payload: Partial<UserUpdatePayload>): Promise<User | undefined> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.put<{ data?: User } | User>(`/users/${id}`, payload)
      return ((data as { data?: User }).data ?? data) as User
    }
    users = users.map((user) => (String(user.id) === String(id) ? { ...user, ...payload } : user))
    return users.find((user) => String(user.id) === String(id))
  },
  async remove(id: string | number): Promise<void> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') await api.delete(`/users/${id}`)
    users = users.filter((user) => String(user.id) !== String(id))
  },
}
