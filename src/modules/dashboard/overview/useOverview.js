import { onMounted } from 'vue'
import { useDashboardStore } from '@/modules/dashboard/store'

export function useOverview() {
  const dashboard = useDashboardStore()

  onMounted(() => dashboard.fetchOverview())

  return { dashboard }
}
