import type { RouteRecordRaw } from 'vue-router'

export const contentManagementRoutes: RouteRecordRaw[] = [
  {
    path: 'contents',
    name: 'contents.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Content Management', permission: 'content.view' },
  },
  {
    path: 'contents/create',
    name: 'contents.create',
    component: () => import('./create/Create.vue'),
    meta: { title: 'Create Content', permission: 'content.create' },
  },
  {
    path: 'contents/:id',
    name: 'contents.show',
    component: () => import('./detail/Detail.vue'),
    meta: { title: 'Content Detail', permission: 'content.view' },
  },
  {
    path: 'contents/:id/edit',
    name: 'contents.edit',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Edit Content', permission: 'content.update' },
  },
]
