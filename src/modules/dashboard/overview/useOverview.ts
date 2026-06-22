import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '../store'

export function useOverview() {
  const store = useDashboardStore()
  const { stats: data, loading } = storeToRefs(store)
  
  const stats = computed(() => [
    { label: 'Total users', value: data.value.total_users ?? 0, icon: 'pi-users', color: 'indigo' },
    { label: 'Active users', value: data.value.active_users ?? 0, icon: 'pi-user-plus', color: 'emerald' },
    { label: 'Published posts', value: data.value.published_posts ?? 0, icon: 'pi-send', color: 'sky' },
    { label: 'Media assets', value: data.value.total_media ?? 0, icon: 'pi-images', color: 'amber' },
  ])
  
  const chartData = computed(() => ({ labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Content', data: data.value.monthly_content ?? [], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.12)', fill: true, tension: .4 }, { label: 'Users', data: data.value.monthly_users ?? [], borderColor: '#10b981', tension: .4 }] }))
  
  const chartOptions = { maintainAspectRatio: false, plugins: { legend: { labels: { usePointStyle: true } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,.15)' } }, x: { grid: { display: false } } } }
  
  onMounted(() => store.fetchStats())

  return { data, loading, stats, chartData, chartOptions }
}
