import api from '@/api/http'
import { ROLE_PERMISSIONS } from '@/constants/permissions'
import type { PaginatedResponse } from '@/types/api'
import type { Role, RoleFilters, RolePayload } from '@/modules/roles/types'

let roles: Role[] = [
  { id: 1, name: 'Super Admin', key: 'super_admin', permissions: ROLE_PERMISSIONS.super_admin },
  { id: 2, name: 'Admin', key: 'admin', permissions: ROLE_PERMISSIONS.admin },
  { id: 3, name: 'Editor', key: 'editor', permissions: ROLE_PERMISSIONS.editor },
  { id: 4, name: 'Viewer', key: 'viewer', permissions: ROLE_PERMISSIONS.viewer },
]

export const roleService = {
  async list(params: RoleFilters = {}): Promise<PaginatedResponse<Role>> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<PaginatedResponse<Role>>('/roles', { params })
      return data
    }
    const search = params.search?.toLowerCase()
    const data = search ? roles.filter((role) => [role.name, role.key].some((value) => value?.toLowerCase().includes(search))) : roles
    return { data, meta: { page: 1, perPage: 10, total: data.length } }
  },
  async find(id: string | number): Promise<Role | undefined> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.get<{ data?: Role } | Role>(`/roles/${id}`)
      return ((data as { data?: Role }).data ?? data) as Role
    }
    return roles.find((role) => String(role.id) === String(id))
  },
  async create(payload: RolePayload): Promise<Role> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.post<{ data?: Role } | Role>('/roles', payload)
      return ((data as { data?: Role }).data ?? data) as Role
    }
    const role: Role = { ...payload, id: Date.now() }
    roles = [role, ...roles]
    return role
  },
  async update(id: string | number, payload: Partial<RolePayload>): Promise<Role | undefined> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') {
      const { data } = await api.put<{ data?: Role } | Role>(`/roles/${id}`, payload)
      return ((data as { data?: Role }).data ?? data) as Role
    }
    roles = roles.map((role) => (String(role.id) === String(id) ? { ...role, ...payload } : role))
    return roles.find((role) => String(role.id) === String(id))
  },
  async remove(id: string | number): Promise<void> {
    if (import.meta.env.VITE_USE_MOCKS === 'false') await api.delete(`/roles/${id}`)
    roles = roles.filter((role) => String(role.id) !== String(id))
  },
}
