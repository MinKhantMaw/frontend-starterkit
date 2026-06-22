<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TopNav from './TopNav.vue'
import { useAdminLayout } from './useAdminLayout'

const { mobileOpen, collapsed, toggle } = useAdminLayout()
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-950">
    <div v-if="mobileOpen" class="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" @click="mobileOpen = false" />
    <Sidebar :collapsed="collapsed" class="-translate-x-full lg:translate-x-0" :class="mobileOpen ? '!translate-x-0 !w-64' : ''" @navigate="mobileOpen = false" />
    <div class="min-w-0 flex-1">
      <TopNav @toggle-sidebar="toggle" />
      <main class="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8"><RouterView /></main>
    </div>
  </div>
</template>
