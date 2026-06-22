import type { RouteRecordRaw } from 'vue-router'

export const taxonomyRoutes: RouteRecordRaw[] = [
  {
    path: 'categories',
    name: 'categories.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Categories', permission: 'category.view' },
  },
  {
    path: 'tags',
    name: 'tags.index',
    component: () => import('./list/List.vue'),
    meta: { title: 'Tags', permission: 'tag.view' },
  },
]
