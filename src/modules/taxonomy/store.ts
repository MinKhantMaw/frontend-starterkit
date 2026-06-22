import { defineStore } from 'pinia'
import { categoriesService, tagsService, type Taxonomy } from './service'

export type TaxonomyKind = 'categories' | 'tags'
const serviceFor = (kind: TaxonomyKind) => kind === 'categories' ? categoriesService : tagsService

export const useTaxonomyStore = defineStore('taxonomy', {
  state: () => ({ items: [] as Taxonomy[], loading: false }),
  actions: {
    async fetchItems(kind: TaxonomyKind) {
      this.loading = true
      try { this.items = (await serviceFor(kind).list({ per_page: 100, tree: kind === 'categories' ? 1 : undefined })).data ?? [] } finally { this.loading = false }
    },
    create(kind: TaxonomyKind, payload: object) { return serviceFor(kind).create(payload) },
    update(kind: TaxonomyKind, id: number, payload: object) { return serviceFor(kind).update(id, payload) },
    remove(kind: TaxonomyKind, id: number) { return serviceFor(kind).remove(id) },
  },
})
