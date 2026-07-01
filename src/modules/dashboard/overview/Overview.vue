<script setup>
import PageHeader from '@/components/common/PageHeader.vue'
import { useOverview } from './useOverview'

const { dashboard } = useOverview()
</script>

<template>
  <PageHeader title="Dashboard" description="Minimal enterprise administration overview." />

  <section v-if="dashboard.loading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
    <article v-for="index in 5" :key="index" class="panel p-5">
      <div class="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div class="mt-4 h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    </article>
  </section>

  <section v-else-if="dashboard.error" class="panel border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
    {{ dashboard.error }}
  </section>

  <section v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
    <article v-for="metric in dashboard.metrics" :key="metric.label" class="panel p-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="muted text-sm">{{ metric.label }}</p>
          <p class="mt-2 text-2xl font-semibold">{{ metric.value }}</p>
        </div>
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">
          <i :class="metric.icon" />
        </span>
      </div>
    </article>
  </section>

  <section v-if="!dashboard.loading && !dashboard.error" class="panel mt-5 p-5">
    <h2 class="text-base font-semibold">Recent Users</h2>

    <div v-if="dashboard.overview.recent_users.length" class="mt-4 overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th class="py-2 pr-4 font-medium">Name</th>
            <th class="py-2 pr-4 font-medium">Email</th>
            <th class="py-2 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="user in dashboard.overview.recent_users" :key="user.id">
            <td class="py-3 pr-4 font-medium text-slate-900 dark:text-white">{{ user.name }}</td>
            <td class="py-3 pr-4 text-slate-600 dark:text-slate-300">{{ user.email }}</td>
            <td class="py-3 pr-4 capitalize text-slate-600 dark:text-slate-300">{{ user.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="muted mt-3">No recent users.</p>
  </section>
</template>
