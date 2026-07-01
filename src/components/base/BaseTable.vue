<script setup>
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  data: { type: Array, default: undefined },
  value: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  emptyMessage: { type: String, default: 'No records found' },
})

const rows = computed(() => {
  if (Array.isArray(props.data)) return props.data
  if (Array.isArray(props.value)) return props.value
  return []
})
</script>

<template>
  <section class="panel overflow-hidden">
    <div v-if="$slots.header || $slots.filters" class="border-b border-slate-200 p-4 dark:border-slate-800">
      <slot name="header" />
      <slot name="filters" />
    </div>

    <DataTable
      :value="rows"
      :loading="loading"
      data-key="id"
      responsive-layout="scroll"
      striped-rows
      class="text-sm"
    >
      <Column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :sortable="column.sortable"
      />
      <slot />
      <template #empty>
        <div class="py-8 text-center text-sm text-slate-500">{{ emptyMessage }}</div>
      </template>
    </DataTable>
  </section>
</template>
