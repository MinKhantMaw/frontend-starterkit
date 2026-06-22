<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import PageTitle from '@/components/PageTitle.vue'
import CmsDataTable from '@/components/CmsDataTable.vue'
import { useList } from './useList'

const { items, loading, selected, open, columns, view, mark, remove } = useList()
</script>
<template>
  <PageTitle title="Contact Messages" description="Review and manage messages from your website." />
  <CmsDataTable :items="items" :columns="columns" :loading="loading" @view="view" @edit="(item) => mark(item, !item.read_at)" @delete="remove"><template #cell-name="{ item }"><div><b>{{ item.name }}</b><div class="text-xs text-slate-500">{{ item.email }}</div></div></template><template #cell-read_at="{ value }"><Tag :value="value ? 'Read' : 'Unread'" :severity="value ? 'secondary' : 'info'" /></template><template #cell-created_at="{ value }">{{ value ? new Date(value).toLocaleString() : '—' }}</template></CmsDataTable>
  <Dialog v-model:visible="open" modal header="Message" class="w-full max-w-2xl"><div v-if="selected" class="space-y-5"><div><h2 class="text-xl font-semibold">{{ selected.subject || 'No subject' }}</h2><p class="text-sm text-slate-500">From {{ selected.name }} · <a :href="`mailto:${selected.email}`" class="text-indigo-600">{{ selected.email }}</a></p></div><p class="whitespace-pre-wrap leading-7">{{ selected.message }}</p><div class="flex justify-end"><Button :label="selected.read_at ? 'Mark unread' : 'Mark read'" :icon="selected.read_at ? 'pi pi-envelope' : 'pi pi-check'" outlined @click="mark(selected, !selected.read_at)" /></div></div></Dialog>
</template>
