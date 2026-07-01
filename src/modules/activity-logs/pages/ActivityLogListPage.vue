<script setup>
import InputText from 'primevue/inputtext'
import BaseFilter from '@/components/common/SearchFilter.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { useList } from './useActivityLogList'

const { activityLogs, filters, columns, load, resetFilters } = useList()
</script>

<template>
  <PageHeader title="Activity Logs" description="Audit trail placeholder for cross-module actions." />

  <BaseTable :data="Array.isArray(activityLogs.items) ? activityLogs.items : []" :columns="columns" :loading="activityLogs.loading">
    <template #filters>
      <BaseFilter @apply="load" @reset="resetFilters">
        <InputText v-model="filters.search" placeholder="Search activity" />
      </BaseFilter>
    </template>
  </BaseTable>
</template>
