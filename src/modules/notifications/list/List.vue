<script setup lang="ts">
import Button from 'primevue/button'
import PageTitle from '@/components/PageTitle.vue'
import { useList } from './useList'

const { items, loading, unread, mark, markAll } = useList()
</script>
<template>
  <PageTitle title="Notification Center" :description="`${unread} unread notifications`" />
  <section class="panel overflow-hidden"><div class="flex justify-end border-b border-slate-200 p-4 dark:border-slate-800"><Button label="Mark all read" icon="pi pi-check-circle" text :disabled="!unread" @click="markAll" /></div><div v-if="loading" class="p-10 text-center"><i class="pi pi-spin pi-spinner" /></div><div v-else-if="!items.length" class="p-12 text-center text-slate-500"><i class="pi pi-bell mb-3 block text-4xl" />You're all caught up.</div><button v-for="item in items" :key="item.id" class="flex w-full items-start gap-4 border-b border-slate-100 p-5 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50" :class="!item.read_at ? 'bg-indigo-50/60 dark:bg-indigo-950/20' : ''" @click="mark(item)"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><i class="pi pi-bell" /></span><span class="min-w-0 flex-1"><b>{{ item.data?.title ?? 'Notification' }}</b><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ item.data?.message }}</p><small class="mt-2 block text-slate-400">{{ item.created_at ? new Date(item.created_at).toLocaleString() : '' }}</small></span><span v-if="!item.read_at" class="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500" /></button></section>
</template>
