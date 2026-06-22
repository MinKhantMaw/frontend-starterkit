import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'
import { menuItems } from './menu'

export function useSidebar() {
  const route = useRoute()
  const auth = useAuthStore()
  const visibleItems = computed(() => menuItems.filter((item) => !item.permission || auth.hasPermission(item.permission)))

  return { route, visibleItems }
}
