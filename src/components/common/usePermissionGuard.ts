import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useAuthStore } from '@/modules/auth/store'

export function usePermissionGuard(permission: MaybeRefOrGetter<string | string[] | undefined>) {
  const auth = useAuthStore()
  const allowed = computed(() => auth.hasPermission(toValue(permission)))
  return { allowed }
}
