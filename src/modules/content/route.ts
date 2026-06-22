import type { RouteRecordRaw } from 'vue-router'

export const contentRoutes: RouteRecordRaw[] = [
  {
    path: 'pages',
    name: 'pages.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Pages', permission: 'page.view' },
  },
  {
    path: 'pages/create',
    name: 'pages.create',
    component: () => import('./create/Create.vue'),
    meta: { title: 'Create Page', permission: 'page.create' },
  },
  {
    path: 'pages/:id/edit',
    name: 'pages.edit',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Edit Page', permission: 'page.update' },
  },
  {
    path: 'posts',
    name: 'posts.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Posts', permission: 'post.view' },
  },
  {
    path: 'posts/create',
    name: 'posts.create',
    component: () => import('./create/Create.vue'),
    meta: { title: 'Create Post', permission: 'post.create' },
  },
  {
    path: 'posts/:id/edit',
    name: 'posts.edit',
    component: () => import('./edit/Edit.vue'),
    meta: { title: 'Edit Post', permission: 'post.update' },
  },
]
