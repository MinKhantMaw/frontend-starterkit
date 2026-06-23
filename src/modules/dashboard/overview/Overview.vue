<script setup>
import PageHeader from '@/components/common/PageHeader.vue'
import { useOverview } from './useOverview'

const { dashboard } = useOverview()
</script>

<template>
  <PageHeader title="Dashboard" description="Minimal enterprise administration overview." />

  <section class="grid gap-4 md:grid-cols-3">
    <article v-for="metric in dashboard.metrics" :key="metric.label" class="panel p-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="muted">{{ metric.label }}</p>
          <p class="mt-2 text-2xl font-semibold">{{ metric.value }}</p>
        </div>
        <span class="grid h-11 w-11 place-items-center rounded-lg bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">
          <i :class="metric.icon" />
        </span>
      </div>
    </article>
  </section>

  <section class="panel mt-5 p-5">
    <h2 class="text-base font-semibold">Starter Surface</h2>
    <p class="muted mt-2">
      Add ERP, CRM, estate management, inventory, HR, accounting, or other business modules without changing the foundation.
    </p>
  </section>
</template>
