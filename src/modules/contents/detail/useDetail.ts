import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '@/modules/contents/store'

export function useDetail() {
  const route = useRoute()
  
  const contents = useContentStore()
  
  onMounted(() => contents.fetchContent(route.params.id as string))

  return { route, contents }
}
