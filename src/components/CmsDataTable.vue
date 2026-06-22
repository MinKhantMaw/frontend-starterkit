<script setup lang="ts" generic="T extends { id: string | number }">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export interface TableColumn { field: string; header: string; sortable?: boolean }
defineProps<{ items: T[]; columns: TableColumn[]; loading?: boolean; total?: number; rows?: number; search?: string; showActions?: boolean }>()
const emit = defineEmits<{ search: [value: string]; page: [event: DataTablePageEvent]; edit: [item: T]; delete: [item: T]; view: [item: T] }>()
</script>
<template>
  <div class="panel overflow-hidden">
    <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
      <span class="relative w-full max-w-sm"><i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><InputText :model-value="search" class="!w-full !pl-9" placeholder="Search…" @update:model-value="emit('search', String($event))" /></span>
      <slot name="toolbar" />
    </div>
    <DataTable :value="items" :loading="loading" data-key="id" striped-rows responsive-layout="scroll" :paginator="(total ?? items.length) > (rows ?? 15)" lazy :rows="rows ?? 15" :total-records="total ?? items.length" @page="emit('page', $event)">
      <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" :sortable="column.sortable"><template #body="{ data }"><slot :name="`cell-${column.field}`" :item="data" :value="data[column.field]">{{ data[column.field] ?? '—' }}</slot></template></Column>
      <Column v-if="showActions !== false" header="Actions" class="w-36"><template #body="{ data }"><div class="flex gap-1"><Button icon="pi pi-eye" text rounded severity="secondary" aria-label="View" @click="emit('view', data)" /><Button icon="pi pi-pencil" text rounded aria-label="Edit" @click="emit('edit', data)" /><Button icon="pi pi-trash" text rounded severity="danger" aria-label="Delete" @click="emit('delete', data)" /></div></template></Column>
      <template #empty><div class="py-8 text-center text-slate-500">No records found.</div></template>
    </DataTable>
  </div>
</template>
