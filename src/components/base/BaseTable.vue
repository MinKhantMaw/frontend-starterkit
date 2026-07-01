<script setup>
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import BasePagination from '@/components/base/BasePagination.vue'

const props = defineProps({
  data: { type: Array, default: undefined },
  value: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  emptyMessage: { type: String, default: 'No records found' },
  dataKey: { type: String, default: 'id' },
  pagination: { type: Object, default: null },
})

const emit = defineEmits(['page'])

const rows = computed(() => {
  if (Array.isArray(props.data)) return props.data
  if (Array.isArray(props.value)) return props.value
  return []
})

const safeColumns = computed(() => (Array.isArray(props.columns) ? props.columns : []))
const paginationState = computed(() => props.pagination || {})
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
      :data-key="dataKey"
      responsive-layout="scroll"
      striped-rows
      class="text-sm"
    >
      <Column
        v-for="column in safeColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :sortable="column.sortable"
      >
        <template v-if="$slots[`column-${column.field}`]" #body="slotProps">
          <slot :name="`column-${column.field}`" v-bind="slotProps" />
        </template>
      </Column>
      <slot />
      <Column v-if="$slots.actions" header="Actions" class="w-44">
        <template #body="slotProps">
          <slot name="actions" v-bind="slotProps" />
        </template>
      </Column>
      <template #empty>
        <div class="py-8 text-center text-sm text-slate-500">{{ emptyMessage }}</div>
      </template>
    </DataTable>

    <div v-if="$slots.pagination || pagination" class="border-t border-slate-200 px-4 pb-4 dark:border-slate-800">
      <slot name="pagination">
        <BasePagination
          :page="paginationState.current_page"
          :per-page="paginationState.per_page"
          :total="paginationState.total"
          @change="$emit('page', $event)"
        />
      </slot>
    </div>
  </section>
</template>
