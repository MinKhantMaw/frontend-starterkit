<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/common/PageHeader.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import ImageUpload from '@/components/form/ImageUpload.vue'
import { useContentStore } from '@/stores/contents'
import { slugify } from '@/utils/slug'

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
</script>

<template>
  <PageHeader :title="isEdit ? 'Edit Content' : 'Create Content'" />
  <el-card shadow="never" class="border border-slate-200">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
      <div class="grid gap-5 lg:grid-cols-[1fr_220px]">
        <div>
          <FormInput v-model="form.title" label="Title" prop="title" />
          <FormInput v-model="form.slug" label="Slug" prop="slug" @update:model-value="slugTouched = true" />
          <FormTextarea v-model="form.excerpt" label="Excerpt" :rows="3" />
          <FormTextarea v-model="form.body" label="Body content" :rows="12" placeholder="Write the full content body" />
        </div>
        <div>
          <FormSelect
            v-model="form.status"
            label="Status"
            prop="status"
            :options="[
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
              { label: 'Archived', value: 'archived' },
            ]"
          />
          <el-form-item label="Published at">
            <el-date-picker v-model="form.published_at" class="w-full" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Publication date" />
          </el-form-item>
          <el-form-item label="Featured image">
            <ImageUpload v-model="form.featured_image" />
          </el-form-item>
        </div>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <RouterLink to="/contents"><el-button>Cancel</el-button></RouterLink>
        <el-button type="primary" native-type="submit" :loading="contents.loading">{{ isEdit ? 'Update' : 'Create' }}</el-button>
      </div>
    </el-form>
  </el-card>
</template>
