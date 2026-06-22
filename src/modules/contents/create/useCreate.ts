import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useContentStore } from '@/modules/contents/store'
import { slugify } from '@/libs/slug'

export function useCreate() {
  const route = useRoute()
  
  const router = useRouter()
  
  const contents = useContentStore()
  
  const formRef = ref<FormInstance>()
  
  const isEdit = computed(() => Boolean(route.params.id))
  
  const slugTouched = ref(false)
  
  const form = reactive({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    featured_image: null as File | string | null,
    status: 'draft',
    published_at: '',
  })
  
  const rules: FormRules = {
    title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
    slug: [{ required: true, message: 'Slug is required', trigger: 'blur' }],
    status: [{ required: true, message: 'Status is required', trigger: 'change' }],
  }
  
  watch(
    () => form.title,
    (title) => {
      if (!slugTouched.value) form.slug = slugify(title)
    },
  )
  
  async function submit() {
    await formRef.value?.validate()
    if (isEdit.value) {
      await contents.updateContent(route.params.id as string, form)
    } else {
      await contents.createContent(form)
    }
    router.push('/contents')
  }
  
  onMounted(async () => {
    if (isEdit.value) {
      await contents.fetchContent(route.params.id as string)
      if (contents.current) {
        form.title = contents.current.title
        form.slug = contents.current.slug
        form.excerpt = contents.current.excerpt || ''
        form.body = contents.current.body || ''
        form.featured_image = contents.current.featured_image || null
        form.status = contents.current.status
        form.published_at = contents.current.published_at || ''
        slugTouched.value = true
      }
    }
  })

  return { route, router, contents, formRef, isEdit, slugTouched, form, rules, submit }
}
