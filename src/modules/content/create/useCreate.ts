import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import { pagesService, postsService } from '../service'
import { categoriesService, tagsService, type Taxonomy } from '@/modules/taxonomy/service'
import { slugify } from '@/libs/slug'
import { notify } from '@/libs/notify'

export function useCreate() {
  const route = useRoute(),
    router = useRouter()
  
  const kind = computed(() => (route.path.startsWith('/pages') ? 'pages' : 'posts'))
  
  const service = computed(() => (kind.value === 'pages' ? pagesService : postsService))
  
  const editing = computed(() => Boolean(route.params.id))
  
  const saving = ref(false),
    image = ref<File>(),
    preview = ref<string>()
  
  const categories = ref<Taxonomy[]>([]),
    tags = ref<Taxonomy[]>([])
  
  const form = reactive({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    status: 'draft',
    category_id: null as number | null,
    tag_ids: [] as number[],
    meta_title: '',
    meta_description: '',
  })
  
  watch(
    () => form.title,
    (value) => {
      if (!editing.value || !form.slug) form.slug = slugify(value)
    },
  )
  
  function selectImage(event: FileUploadSelectEvent) {
    const file = event.files[0]
    if (file) {
      image.value = file
      preview.value = URL.createObjectURL(file)
    }
  }
  
  async function submit() {
    saving.value = true
    try {
      let payload: object = { ...form }
      if (image.value) {
        const data = new FormData()
        Object.entries(form).forEach(([key, value]) => {
          if (Array.isArray(value)) value.forEach((entry) => data.append(`${key}[]`, String(entry)))
          else if (value !== null) data.append(key, String(value))
        })
        data.append('featured_image', image.value)
        if (editing.value) data.append('_method', 'PUT')
        payload = data
      }
      if (editing.value)
        await service.value.update(
          Number(route.params.id),
          payload,
          image.value ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined,
        )
      else
        await service.value.create(
          payload,
          image.value ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined,
        )
      notify('success', `${kind.value === 'pages' ? 'Page' : 'Post'} saved`)
      await router.push(`/${kind.value}`)
    } finally {
      saving.value = false
    }
  }
  
  onMounted(async () => {
    if (kind.value === 'posts') {
      const [categoryResult, tagResult] = await Promise.all([
        categoriesService.list({ per_page: 100 }),
        tagsService.list({ per_page: 100 }),
      ])
      categories.value = categoryResult.data
      tags.value = tagResult.data
    }
    if (editing.value) {
      const item = await service.value.get(Number(route.params.id))
      Object.assign(form, item, { tag_ids: item.tags?.map((tag) => tag.id) ?? [], category_id: item.category_id ?? null })
      preview.value = item.featured_image ?? undefined
    }
  })

  return { route, router, kind, service, editing, saving, image, preview, categories, tags, form, selectImage, submit }
}
