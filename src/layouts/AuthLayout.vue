<script setup>
import { APP_NAME } from '@/constants/app'
</script>

<template>
  <main class="grid min-h-screen bg-slate-100 lg:grid-cols-[minmax(0,1fr)_28rem] dark:bg-slate-950">
    <section class="hidden border-r border-slate-200 bg-white p-10 lg:flex lg:flex-col lg:justify-between dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-lg bg-cyan-600 text-white">
          <i class="pi pi-building" />
        </span>
        <span class="text-lg font-semibold">{{ APP_NAME }}</span>
      </div>
      <div class="max-w-xl">
        <h1 class="text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
          Reusable enterprise administration foundation.
        </h1>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Authentication, authorization, routing, CRUD conventions, profile management, and activity visibility for internal business systems.
        </p>
      </div>
      <p class="text-xs text-slate-500">Vue 3 • Pinia • PrimeVue • TailwindCSS</p>
    </section>
    <section class="grid place-items-center px-4 py-10">
      <RouterView />
    </section>
  </main>
</template>
