<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import TopNav from './TopNav.vue'

const collapsed = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div v-if="!collapsed" class="fixed inset-0 z-20 bg-slate-950/30 lg:hidden" @click="collapsed = true" />
    <div class="flex min-h-screen">
      <Sidebar :collapsed="collapsed" class="hidden lg:block" />
      <Sidebar :collapsed="collapsed" class="lg:hidden" :class="collapsed ? '-translate-x-full' : 'translate-x-0'" />
      <div class="min-w-0 flex-1">
        <TopNav :collapsed="collapsed" @toggle-sidebar="collapsed = !collapsed" />
        <main class="mx-auto w-full max-w-7xl p-4 lg:p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
