import { ref } from 'vue'

export function useAdminLayout() {
  const sidebarOpen = ref(false)
  const collapsed = ref(false)

  function toggleSidebar() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      collapsed.value = !collapsed.value
      return
    }

    sidebarOpen.value = !sidebarOpen.value
  }

  function closeSidebar() {
    sidebarOpen.value = false
  }

  return { sidebarOpen, collapsed, toggleSidebar, closeSidebar }
}
