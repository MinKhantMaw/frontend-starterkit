import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/modules/roles/store'

export function useDetail() {
  const route = useRoute()
  
  const roles = useRoleStore()
  
  onMounted(() => roles.fetchRole(route.params.id as string))

  return { route, roles }
}
