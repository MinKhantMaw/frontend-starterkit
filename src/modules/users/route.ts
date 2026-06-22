import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'User Management', permission: 'user.view' },
  },
  {
    path: 'users/create',
    name: 'users.create',
    component: () => import('./create/Create.vue'),
    meta: { title: 'Create User', permission: 'user.create' },
  },
  {
    path: 'users/:id',
    name: 'users.show',
    component: () => import('./detail/Detail.vue'),
    meta: { title: 'User Detail', permission: 'user.view' },
  },
  {
    path: 'users/:id/edit',
    name: 'users.edit',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Edit User', permission: 'user.update' },
  },
]
