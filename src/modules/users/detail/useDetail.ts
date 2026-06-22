import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/modules/users/store'

export function useDetail() {
  const route = useRoute()
  
  const users = useUserStore()
  
  function roleName() {
    const role = users.current?.roles?.[0] ?? users.current?.role
    return typeof role === 'string' ? role : role?.name ?? '-'
  }
  
  onMounted(() => users.fetchUser(route.params.id as string))

  return { route, users, roleName }
}
