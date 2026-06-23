<script setup>
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import NotificationDropdown from '@/components/common/NotificationDropdown.vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/modules/auth/store'

defineProps({
  collapsed: { type: Boolean, default: false },
})

defineEmits(['toggle-sidebar'])

const router = useRouter()
const auth = useAuthStore()
const app = useAppStore()
const menu = ref()

const userMenu = [
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => router.push({ name: 'profile.detail' }),
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: async () => {
      await auth.logout()
      router.push({ name: 'login' })
    },
  },
]
</script>

<template>
  <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
    <div class="flex items-center gap-3">
      <Button
        type="button"
        severity="secondary"
        text
        rounded
        :icon="collapsed ? 'pi pi-angle-double-right' : 'pi pi-bars'"
        aria-label="Toggle sidebar"
        @click="$emit('toggle-sidebar')"
      />
      <Breadcrumb />
    </div>

    <div class="flex items-center gap-3">
      <NotificationDropdown />
      <Button icon="pi pi-moon" rounded text severity="secondary" aria-label="Toggle dark mode" @click="app.toggleDarkMode()" />
      <div class="hidden text-right sm:block">
        <p class="text-sm font-medium">{{ auth.user?.name || 'Administrator' }}</p>
        <p class="text-xs text-slate-500">{{ auth.user?.email || 'admin@example.com' }}</p>
      </div>
      <Button icon="pi pi-user" rounded outlined severity="secondary" aria-label="User menu" @click="menu.toggle($event)" />
      <Menu ref="menu" :model="userMenu" popup />
    </div>
  </header>
</template>
