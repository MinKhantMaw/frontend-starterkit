<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Tree from 'primevue/tree'
import PageTitle from '@/components/PageTitle.vue'
import CmsDataTable from '@/components/CmsDataTable.vue'
import { useList } from './useList'

const { kind, items, loading, open, editingId, form, columns, treeNodes, edit, save, remove } = useList()
</script>
<template>
  <PageTitle :title="kind === 'categories' ? 'Categories' : 'Tags'" :description="`Organize content with ${kind}.`" />
  <div class="mb-4 flex justify-end"><Button label="Create" icon="pi pi-plus" @click="edit()" /></div>
  <div v-if="kind === 'categories'" class="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
    <section class="panel p-4">
      <h2 class="mb-3 font-semibold">Category tree</h2>
      <Tree :value="treeNodes" class="!border-0 !p-0" />
    </section>
    <CmsDataTable :items="items" :columns="columns" :loading="loading" @edit="edit" @delete="remove" @view="edit" />
  </div>
  <CmsDataTable
    v-else
    :items="items"
    :columns="columns"
    :loading="loading"
    @edit="edit"
    @delete="remove"
    @view="edit"
  />
  <Dialog
    v-model:visible="open"
    modal
    :header="`${editingId ? 'Edit' : 'Create'} ${kind === 'categories' ? 'category' : 'tag'}`"
    class="w-full max-w-lg"
    ><form class="space-y-4" @submit.prevent="save">
      <div><label class="field-label">Name</label><InputText v-model="form.name" class="!w-full" required /></div>
      <div><label class="field-label">Slug</label><InputText v-model="form.slug" class="!w-full" /></div>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" text @click="open = false" /><Button type="submit" label="Save" />
      </div></form
  ></Dialog>
</template>
