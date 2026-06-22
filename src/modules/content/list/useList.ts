import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue/useconfirm'
import { useRoute, useRouter } from 'vue-router'
import { useCmsContentStore, type ContentKind } from '../store'
import type { CmsContent } from '../types'
import { notify } from '@/libs/notify'

export function useList() {
  const route = useRoute(), router = useRouter(), confirm = useConfirm()
  
  const kind = computed(() => route.path.startsWith('/pages') ? 'pages' : 'posts')
  
  const store = useCmsContentStore()
  const { items, total, loading } = storeToRefs(store)
  const page = ref(1), perPage = ref(15), search = ref('')
  const resource = { items, total, loading, page, perPage, search }
  
  const columns = [{ field: 'title', header: 'Title', sortable: true }, { field: 'status', header: 'Status' }, { field: 'created_at', header: 'Created' }]
  
  async function load() { await store.fetchItems(kind.value as ContentKind, { page: page.value, per_page: perPage.value, search: search.value || route.query.search }) }
  
  function remove(item: CmsContent) { confirm.require({ message: `Delete “${item.title}”?`, header: 'Confirm deletion', icon: 'pi pi-exclamation-triangle', rejectProps: { label: 'Cancel', severity: 'secondary' }, acceptProps: { label: 'Delete', severity: 'danger' }, accept: async () => { await store.remove(kind.value as ContentKind, item.id); notify('success', 'Deleted'); await load() } }) }
  
  watch(kind, load)
  
  onMounted(load)

  return { route, router, confirm, kind, resource, columns, load, remove }
}
