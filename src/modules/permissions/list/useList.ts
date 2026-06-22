import { onMounted } from 'vue'
import { usePermissionStore } from '@/modules/permissions/store'
import { titleCase } from '@/libs/permissions'

export function useList() {
  const permissions = usePermissionStore()
  
  onMounted(() => permissions.fetchPermissions())

  return { permissions, titleCase }
}
