import { computed, ref } from 'vue'
import type { ResourceService } from '@/libs/resourceService'

export function useResource<T extends { id: number | string }>(service: ResourceService<T, object>) {
  const items = ref<T[]>([])
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const perPage = ref(15)
  const search = ref('')

  async function fetchItems(extra: Record<string, unknown> = {}) {
    loading.value = true
    try {
      const result = await service.list({ page: page.value, per_page: perPage.value, search: search.value || undefined, ...extra })
      items.value = result.data
      total.value = result.meta?.total ?? result.data.length
    } finally { loading.value = false }
  }

  async function remove(id: T['id']) { await service.remove(id); await fetchItems() }

  return { items, loading, total, page, perPage, search, empty: computed(() => !loading.value && !items.value.length), fetchItems, remove }
}
