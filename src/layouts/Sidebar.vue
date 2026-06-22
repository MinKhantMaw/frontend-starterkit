<script setup lang="ts">
import { useSidebar } from './useSidebar'

defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ navigate: [] }>()
const { route, visibleItems } = useSidebar()
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:h-screen" :class="collapsed ? 'w-[76px]' : 'w-64'">
    <RouterLink to="/dashboard" class="flex h-16 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-black text-white">C</span>
      <span v-if="!collapsed" class="text-lg font-bold tracking-tight">Nexus CMS</span>
    </RouterLink>
    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      <RouterLink v-for="item in visibleItems" :key="item.to" :to="item.to" :title="collapsed ? item.title : undefined" class="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" :class="route.path.startsWith(item.to) ? 'bg-indigo-50 !text-indigo-700 dark:bg-indigo-950/50 dark:!text-indigo-300' : ''" @click="emit('navigate')">
        <i :class="item.icon" class="text-lg" />
        <span v-if="!collapsed" class="truncate">{{ item.title }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
