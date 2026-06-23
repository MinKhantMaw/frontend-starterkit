<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps({
  value: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  emptyMessage: { type: String, default: 'No records found' },
})
</script>

<template>
  <section class="panel overflow-hidden">
    <div v-if="$slots.header || $slots.filters" class="border-b border-slate-200 p-4 dark:border-slate-800">
      <slot name="header" />
      <slot name="filters" />
    </div>

    <DataTable
      :value="value"
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
