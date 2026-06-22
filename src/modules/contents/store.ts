import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { contentsApi, type ContentPayload } from '@/modules/contents/service'
import type { Content, PaginationMeta, QueryParams } from '@/libs/types'

export const useContentStore = defineStore('contents', {
  state: () => ({
    contents: [] as Content[],
    current: null as Content | null,
    meta: null as PaginationMeta | null,
    loading: false,
  }),
  actions: {
    async fetchContents(params: QueryParams = {}) {
      this.loading = true
      try {
        const response = await contentsApi.list(params)
        this.contents = response.data
        this.meta = response.meta ?? null
      } finally {
        this.loading = false
      }
    },
    async fetchContent(id: string | number) {
      this.loading = true
      try {
        this.current = await contentsApi.get(id)
      } finally {
        this.loading = false
      }
    },
    async createContent(payload: ContentPayload) {
      await contentsApi.create(payload)
      ElMessage.success('Content created')
    },
    async updateContent(id: string | number, payload: ContentPayload) {
      await contentsApi.update(id, payload)
      ElMessage.success('Content updated')
    },
    async deleteContent(id: string | number) {
      await contentsApi.remove(id)
      ElMessage.success('Content deleted')
    },
    async publishContent(id: string | number) {
      await contentsApi.publish(id)
      ElMessage.success('Content published')
    },
    async unpublishContent(id: string | number) {
      await contentsApi.unpublish(id)
      ElMessage.success('Content unpublished')
    },
  },
})
