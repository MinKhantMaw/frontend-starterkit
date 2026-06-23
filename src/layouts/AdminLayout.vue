<script setup>
import Sidebar from './Sidebar.vue'
import TopNav from './TopNav.vue'
import { useAdminLayout } from './useAdminLayout'

const { sidebarOpen, collapsed, toggleSidebar, closeSidebar } = useAdminLayout()
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div v-if="sidebarOpen" class="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" @click="closeSidebar" />
    <Sidebar
      :open="sidebarOpen"
      :collapsed="collapsed"
      @close="closeSidebar"
    />
    <div class="min-w-0 transition-all duration-200 lg:pl-72" :class="{ 'lg:pl-20': collapsed }">
      <TopNav :collapsed="collapsed" @toggle-sidebar="toggleSidebar" />
      <main class="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
