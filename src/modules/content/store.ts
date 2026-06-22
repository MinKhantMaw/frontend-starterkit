import { defineStore } from 'pinia'
import { pagesService, postsService } from './service'
import type { CmsContent } from './types'

export type ContentKind = 'pages' | 'posts'

const serviceFor = (kind: ContentKind) => kind === 'pages' ? pagesService : postsService

export const useCmsContentStore = defineStore('cms-content', {
  state: () => ({ items: [] as CmsContent[], total: 0, loading: false }),
  actions: {
    async fetchItems(kind: ContentKind, params: Record<string, unknown>) {
      this.loading = true
      try {
        const result = await serviceFor(kind).list(params)
        this.items = result.data
        this.total = result.meta?.total ?? result.data.length
      } finally {
        this.loading = false
      }
    },
    async remove(kind: ContentKind, id: number) {
      await serviceFor(kind).remove(id)
    },
  },
})
