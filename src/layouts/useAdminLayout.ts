import { ref } from 'vue'

export function useAdminLayout() {
  const mobileOpen = ref(false)
  const collapsed = ref(false)

  function toggle() {
    if (window.innerWidth < 1024) mobileOpen.value = !mobileOpen.value
    else collapsed.value = !collapsed.value
  }

  return { mobileOpen, collapsed, toggle }
}
