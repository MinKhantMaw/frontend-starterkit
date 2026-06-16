<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuItems } from './menu'
import { useAuthStore } from '@/stores/auth'

defineProps<{ collapsed: boolean }>()

const route = useRoute()
const auth = useAuthStore()
const visibleItems = computed(() => menuItems.filter((item) => auth.can(item.permission)))
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-30 border-r border-slate-200 bg-white transition-all duration-200 lg:static"
    :class="collapsed ? 'w-20' : 'w-64'"
  >
    <div class="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
      <div class="grid h-9 w-9 shrink-0 place-items-center rounded bg-brand-600 font-bold text-white">CMS</div>
      <span v-if="!collapsed" class="text-lg font-semibold text-slate-950">Admin</span>
    </div>
    <el-scrollbar class="h-[calc(100vh-4rem)]">
      <nav class="p-3">
        <RouterLink
          v-for="item in visibleItems"
          :key="item.to"
          :to="item.to"
          class="mb-1 flex h-11 items-center gap-3 rounded px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          :class="{ 'bg-brand-50 text-brand-700': route.path.startsWith(item.to) }"
        >
          <el-icon class="text-lg"><component :is="item.icon" /></el-icon>
          <span v-if="!collapsed" class="truncate">{{ item.title }}</span>
        </RouterLink>
      </nav>
    </el-scrollbar>
  </aside>
</template>
