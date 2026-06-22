import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/modules/notifications/store'
import { useThemeStore } from '@/modules/theme/store'

interface ToggleRef {
  toggle(event: Event): void
}

export function useTopNav(toggleSidebar: () => void) {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const theme = useThemeStore()
  const profileMenu = ref<ToggleRef>()
  const notificationsPanel = ref<ToggleRef>()
  const notificationStore = useNotificationStore()
  const { items: notifications, unread } = storeToRefs(notificationStore)
  const breadcrumbs = computed(() => route.matched.filter((record) => record.meta.title).map((record) => record.meta.title as string))

  async function logout() {
    await auth.logout()
    await router.push({ name: 'login' })
  }

  const profileItems = computed(() => [
    { label: 'Profile', icon: 'pi pi-user', command: () => router.push('/profile') },
    { label: 'Settings', icon: 'pi pi-cog', command: () => router.push('/settings') },
    { separator: true },
    { label: 'Sign out', icon: 'pi pi-sign-out', command: logout },
  ])

  async function loadNotifications() {
    try {
      await notificationStore.fetchNotifications(5)
    } catch {
      notifications.value = []
    }
  }

  onMounted(() => {
    theme.apply()
    void loadNotifications()
  })

  return { router, auth, theme, profileMenu, notificationsPanel, notifications, breadcrumbs, unread, profileItems, toggleSidebar }
}
