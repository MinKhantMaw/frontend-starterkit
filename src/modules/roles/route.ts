import type { RouteRecordRaw } from 'vue-router'

export const roleRoutes: RouteRecordRaw[] = [
  {
    path: 'roles',
    name: 'roles.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Role Management', permission: 'role.view' },
  },
  {
    path: 'roles/create',
    name: 'roles.create',
    component: () => import('./create/Create.vue'),
    meta: { title: 'Create Role', permission: 'role.create' },
  },
  {
    path: 'roles/:id',
    name: 'roles.show',
    component: () => import('./detail/Detail.vue'),
    meta: { title: 'Role Detail', permission: 'role.view' },
  },
  {
    path: 'roles/:id/edit',
    name: 'roles.edit',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Edit Role', permission: 'role.update' },
  },
]
