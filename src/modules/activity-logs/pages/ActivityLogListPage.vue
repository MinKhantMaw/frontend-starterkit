<script setup>
import FilterBar from '@/components/common/FilterBar.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { useList } from './useActivityLogList'

const { activityLogs, filters, columns, pagination, load, resetFilters } = useList()
</script>

<template>
  <PageHeader title="Activity Logs" description="Audit trail placeholder for cross-module actions." />

  <BaseTable :data="Array.isArray(activityLogs.items) ? activityLogs.items : []" :columns="columns" :loading="activityLogs.loading">
    <template #filters>
      <FilterBar
        :model-value="filters"
        search-placeholder="Search activity"
        @update:model-value="Object.assign(filters, $event)"
        @apply="load"
        @reset="resetFilters"
      />
    </template>
  </BaseTable>

  <BasePagination
    :page="pagination.current_page"
    :per-page="pagination.per_page"
    :total="pagination.total"
    @change="load($event.page, $event.perPage)"
  />
</template>
