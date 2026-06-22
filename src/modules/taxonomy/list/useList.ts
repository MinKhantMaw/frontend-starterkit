import { computed, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import type { Taxonomy } from '../service'
import { useTaxonomyStore, type TaxonomyKind } from '../store'
import { slugify } from '@/libs/slug'
import { notify } from '@/libs/notify'

export function useList() {
  const route = useRoute(),
    confirm = useConfirm()
  
  const kind = computed(() => (route.path.startsWith('/categories') ? 'categories' : 'tags'))
  
  const store = useTaxonomyStore()
  const { items, loading } = storeToRefs(store)
  const open = ref(false),
    editingId = ref<number>()
  
  const form = reactive({ name: '', slug: '', parent_id: null as number | null })
  
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'slug', header: 'Slug' },
    { field: 'posts_count', header: 'Posts' },
  ]
  
  const treeNodes = computed(() => items.value.map(toNode))
  
  function toNode(item: Taxonomy): { key: string; label: string; children?: ReturnType<typeof toNode>[] } {
    return { key: String(item.id), label: item.name, children: item.children?.map(toNode) }
  }
  
  async function load() {
    await store.fetchItems(kind.value as TaxonomyKind)
  }
  
  function edit(item?: Taxonomy) {
    editingId.value = item?.id
    Object.assign(form, { name: item?.name ?? '', slug: item?.slug ?? '', parent_id: item?.parent_id ?? null })
    open.value = true
  }
  
  async function save() {
    const payload = { ...form, slug: form.slug || slugify(form.name) }
    editingId.value ? await store.update(kind.value as TaxonomyKind, editingId.value, payload) : await store.create(kind.value as TaxonomyKind, payload)
    open.value = false
    notify('success', 'Saved')
    await load()
  }
  
  function remove(item: Taxonomy) {
    confirm.require({
      message: `Delete “${item.name}”?`,
      header: 'Confirm deletion',
      acceptProps: { severity: 'danger', label: 'Delete' },
      accept: async () => {
        await store.remove(kind.value as TaxonomyKind, item.id)
        await load()
      },
    })
  }
  
  watch(kind, load)
  
  onMounted(load)

  return { route, confirm, kind, items, loading, open, editingId, form, columns, treeNodes, toNode, load, edit, save, remove }
}
