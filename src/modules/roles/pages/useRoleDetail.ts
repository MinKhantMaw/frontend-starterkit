import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/modules/roles/store'

export function useDetail() {
  const route = useRoute()
  const roles = useRoleStore()
  const id = String(route.params.id)

  onMounted(() => roles.fetchRole(id))

  return { roles }
}
