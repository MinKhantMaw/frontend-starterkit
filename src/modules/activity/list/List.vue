<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import PageTitle from '@/components/PageTitle.vue'
import CmsDataTable from '@/components/CmsDataTable.vue'
import { useList } from './useList'

const { items, loading, total, page, filters, columns, load, clear } = useList()
</script>
<template>
  <PageTitle title="Activity Logs" description="Audit administrative actions and system events." />
  <section class="panel mb-5 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4"><InputText v-model="filters.search" placeholder="Search activity…" @keyup.enter="load" /><Select v-model="filters.event" :options="['created', 'updated', 'deleted', 'login', 'logout']" placeholder="All events" show-clear /><DatePicker v-model="filters.date" placeholder="Any date" show-icon /><div class="flex gap-2"><Button label="Filter" icon="pi pi-filter" @click="load" /><Button label="Clear" severity="secondary" text @click="clear" /></div></section>
  <CmsDataTable :items="items" :columns="columns" :loading="loading" :total="total" :show-actions="false" @page="page = $event.page + 1; load()"><template #cell-causer="{ item }"><div><b class="text-sm">{{ item.causer?.name ?? 'System' }}</b><div class="text-xs text-slate-500">{{ item.causer?.email }}</div></div></template><template #cell-event="{ value }"><span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize dark:bg-slate-800">{{ value ?? 'action' }}</span></template><template #cell-created_at="{ value }">{{ value ? new Date(value).toLocaleString() : '—' }}</template></CmsDataTable>
</template>
