<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
import { resolveMenuForUser } from '@/menu'
import { APP_NAME } from '@/constants/app'

defineProps({
  open: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
})

defineEmits(['close'])

const auth = useAuthStore()
const items = computed(() => resolveMenuForUser(auth))
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900"
    :class="[
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      collapsed ? 'lg:w-20' : 'lg:w-72',
    ]"
  >
    <div class="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-600 text-white">
        <i class="pi pi-building" />
      </span>
      <span v-if="!collapsed" class="font-semibold">{{ APP_NAME }}</span>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      <RouterLink
        v-for="item in items"
        :key="item.route"
        :to="item.route"
        class="flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        active-class="bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200"
        @click="$emit('close')"
      >
        <i :class="[item.icon, 'text-base']" />
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
