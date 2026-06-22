<script setup lang="ts">
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import OverlayBadge from 'primevue/overlaybadge'
import InputText from 'primevue/inputtext'
import Popover from 'primevue/popover'
import { useTopNav } from './useTopNav'

const emit = defineEmits<{ toggleSidebar: [] }>()
const { router, auth, theme, profileMenu, notificationsPanel, notifications, breadcrumbs, unread, profileItems, toggleSidebar } = useTopNav(() => emit('toggleSidebar'))
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-5">
    <div class="flex min-w-0 items-center gap-3">
      <Button icon="pi pi-bars" text rounded aria-label="Toggle navigation" @click="toggleSidebar" />
      <nav class="hidden truncate text-sm text-slate-500 md:flex md:items-center md:gap-2">
        <template v-for="(item, index) in breadcrumbs" :key="item">
          <i v-if="index" class="pi pi-angle-right text-xs" />
          <span :class="index === breadcrumbs.length - 1 ? 'font-semibold text-slate-800 dark:text-slate-100' : ''">{{ item }}</span>
        </template>
      </nav>
    </div>
    <div class="flex items-center gap-1 sm:gap-2">
      <span class="relative hidden lg:block">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <InputText placeholder="Search CMS…" class="!w-64 !rounded-xl !pl-9" @keyup.enter="router.push({ path: '/posts', query: { search: ($event.target as HTMLInputElement).value } })" />
      </span>
      <Button :icon="theme.theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'" text rounded aria-label="Toggle theme" @click="theme.toggle()" />
      <OverlayBadge :value="unread || undefined" severity="danger">
        <Button icon="pi pi-bell" text rounded aria-label="Notifications" @click="notificationsPanel?.toggle($event)" />
      </OverlayBadge>
      <button class="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" @click="profileMenu?.toggle($event)">
        <Avatar :image="auth.user?.avatar || undefined" :label="auth.user?.name?.slice(0, 1)" shape="circle" />
        <span class="hidden text-left sm:block"><b class="block text-sm">{{ auth.user?.name }}</b><small class="text-slate-500">Administrator</small></span>
        <i class="pi pi-angle-down hidden text-xs sm:block" />
      </button>
      <Menu ref="profileMenu" :model="profileItems" popup />
      <Popover ref="notificationsPanel">
        <div class="w-80 max-w-[80vw]">
          <div class="mb-3 flex items-center justify-between"><b>Notifications</b><RouterLink to="/notifications" class="text-sm text-indigo-600">View all</RouterLink></div>
          <div v-if="!notifications.length" class="py-6 text-center text-sm text-slate-500">No notifications</div>
          <div v-for="notification in notifications" :key="notification.id" class="border-t border-slate-100 py-3 text-sm dark:border-slate-800">{{ notification.data?.message ?? 'New notification' }}</div>
        </div>
      </Popover>
    </div>
  </header>
</template>
