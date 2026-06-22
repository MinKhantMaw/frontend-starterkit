<script setup lang="ts">
import Chart from 'primevue/chart'
import Tag from 'primevue/tag'
import PageTitle from '@/components/PageTitle.vue'
import { useOverview } from './useOverview'

const { data, loading, stats, chartData, chartOptions } = useOverview()
</script>
<template>
  <PageTitle title="Dashboard" description="A live overview of content and team activity." />
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><article v-for="stat in stats" :key="stat.label" class="panel flex items-center justify-between p-5"><div><p class="text-sm font-medium text-slate-500">{{ stat.label }}</p><p class="mt-2 text-3xl font-bold">{{ loading ? '—' : stat.value.toLocaleString() }}</p></div><span class="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60"><i class="pi text-xl" :class="stat.icon" /></span></article></div>
  <div class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]"><section class="panel p-5"><div class="mb-4"><h2 class="font-semibold">Growth overview</h2><p class="text-sm text-slate-500">New content and users this year</p></div><Chart type="line" :data="chartData" :options="chartOptions" class="h-80" /></section><section class="panel p-5"><h2 class="mb-4 font-semibold">Recent activity</h2><div v-if="!data.recent_activities?.length" class="py-10 text-center text-sm text-slate-500">No recent activity.</div><div v-for="activity in data.recent_activities" :key="activity.id" class="relative border-l border-slate-200 pb-5 pl-5 last:pb-0 dark:border-slate-700"><span class="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900" /><p class="text-sm"><b>{{ activity.causer?.name ?? 'System' }}</b> {{ activity.description }}</p><small class="text-slate-400">{{ activity.created_at ? new Date(activity.created_at).toLocaleString() : '' }}</small></div></section></div>
  <section class="panel mt-5 overflow-hidden"><div class="border-b border-slate-200 p-5 dark:border-slate-800"><h2 class="font-semibold">Latest posts</h2></div><div v-if="!data.latest_posts?.length" class="p-10 text-center text-sm text-slate-500">No posts yet.</div><RouterLink v-for="post in data.latest_posts" :key="post.id" :to="`/posts/${post.id}/edit`" class="flex items-center justify-between gap-4 border-b border-slate-100 p-4 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"><div><b class="text-sm">{{ post.title }}</b><p class="text-xs text-slate-500">{{ post.created_at ? new Date(post.created_at).toLocaleDateString() : '' }}</p></div><Tag :value="post.status" :severity="post.status === 'published' ? 'success' : 'warn'" /></RouterLink></section>
</template>
