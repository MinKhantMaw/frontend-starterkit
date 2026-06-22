<script setup lang="ts">
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import PageTitle from '@/components/PageTitle.vue'
import { useList } from './useList'

const { items, grid, upload, remove } = useList()
</script>
<template>
  <PageTitle title="Media Library" description="Upload, browse and manage digital assets." />
  <section class="panel mb-5 p-5"><FileUpload name="files[]" multiple custom-upload :max-file-size="10000000" accept="image/*,video/*,.pdf,.doc,.docx" @uploader="upload"><template #empty><div class="flex flex-col items-center py-8 text-slate-500"><i class="pi pi-cloud-upload mb-3 text-4xl text-indigo-500" /><p>Drag files here or choose from your device</p><small>Maximum 10 MB per file</small></div></template></FileUpload></section>
  <section class="panel overflow-hidden"><div class="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800"><b>{{ items.length }} assets</b><div><Button icon="pi pi-th-large" text :severity="grid ? 'primary' : 'secondary'" @click="grid = true" /><Button icon="pi pi-list" text :severity="!grid ? 'primary' : 'secondary'" @click="grid = false" /></div></div>
    <div v-if="grid" class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"><article v-for="item in items" :key="item.id" class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"><img v-if="item.mime_type?.startsWith('image') || item.url" :src="item.url ?? item.path" :alt="item.name" class="aspect-square w-full bg-slate-100 object-cover" /><div v-else class="grid aspect-square place-items-center bg-slate-100 dark:bg-slate-800"><i class="pi pi-file text-4xl text-slate-400" /></div><div class="p-3"><p class="truncate text-sm font-medium">{{ item.name ?? item.file_name }}</p></div><Button icon="pi pi-trash" rounded severity="danger" class="!absolute right-2 top-2 !hidden !h-8 !w-8 group-hover:!inline-flex" @click="remove(item)" /></article></div>
    <div v-else class="divide-y divide-slate-200 dark:divide-slate-800"><div v-for="item in items" :key="item.id" class="flex items-center gap-4 p-3"><div class="grid h-12 w-12 place-items-center overflow-hidden rounded-lg bg-slate-100"><img v-if="item.url" :src="item.url" class="h-full w-full object-cover" /><i v-else class="pi pi-file" /></div><div class="min-w-0 flex-1"><b class="block truncate text-sm">{{ item.name ?? item.file_name }}</b><small class="text-slate-500">{{ item.mime_type }} · {{ item.size ? `${Math.round(item.size / 1024)} KB` : '' }}</small></div><Button icon="pi pi-trash" text severity="danger" @click="remove(item)" /></div></div>
  </section>
</template>
