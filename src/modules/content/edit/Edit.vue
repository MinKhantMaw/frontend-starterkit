<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Editor from 'primevue/editor'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import PageTitle from '@/components/PageTitle.vue'
import { useEdit } from './useEdit'

const { kind, editing, saving, preview, categories, tags, form, selectImage, submit } = useEdit()
</script>
<template>
  <PageTitle
    :title="`${editing ? 'Edit' : 'Create'} ${kind === 'pages' ? 'Page' : 'Post'}`"
    description="Content, publishing and search appearance."
  />
  <form class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]" @submit.prevent="submit">
    <div class="space-y-5">
      <section class="panel space-y-4 p-5">
        <div><label class="field-label">Title</label><InputText v-model="form.title" class="!w-full" required /></div>
        <div><label class="field-label">Slug</label><InputText v-model="form.slug" class="!w-full" required /></div>
        <div>
          <label class="field-label">Excerpt</label><Textarea v-model="form.excerpt" class="!w-full" rows="3" />
        </div>
        <div><label class="field-label">Content</label><Editor v-model="form.body" editor-style="height: 420px" /></div>
      </section>
      <section class="panel space-y-4 p-5">
        <h2 class="text-lg font-semibold">Search engine optimization</h2>
        <div>
          <label class="field-label">Meta title</label
          ><InputText v-model="form.meta_title" class="!w-full" maxlength="60" />
        </div>
        <div>
          <label class="field-label">Meta description</label
          ><Textarea v-model="form.meta_description" class="!w-full" rows="3" maxlength="160" />
        </div>
      </section>
    </div>
    <aside class="space-y-5">
      <section class="panel space-y-4 p-5">
        <h2 class="font-semibold">Publishing</h2>
        <div>
          <label class="field-label">Status</label
          ><Select v-model="form.status" :options="['draft', 'published', 'archived']" class="!w-full" />
        </div>
        <Button type="submit" label="Save" icon="pi pi-check" class="!w-full" :loading="saving" />
      </section>
      <section v-if="kind === 'posts'" class="panel space-y-4 p-5">
        <h2 class="font-semibold">Organization</h2>
        <div>
          <label class="field-label">Category</label
          ><Select
            v-model="form.category_id"
            :options="categories"
            option-label="name"
            option-value="id"
            show-clear
            class="!w-full"
          />
        </div>
        <div>
          <label class="field-label">Tags</label
          ><MultiSelect
            v-model="form.tag_ids"
            :options="tags"
            option-label="name"
            option-value="id"
            display="chip"
            filter
            class="!w-full"
          />
        </div>
      </section>
      <section v-if="kind === 'posts'" class="panel space-y-3 p-5">
        <h2 class="font-semibold">Featured image</h2>
        <img
          v-if="preview"
          :src="preview"
          alt="Preview"
          class="aspect-video w-full rounded-xl object-cover"
        /><FileUpload mode="basic" accept="image/*" choose-label="Choose image" custom-upload @select="selectImage" />
      </section>
    </aside>
  </form>
</template>
