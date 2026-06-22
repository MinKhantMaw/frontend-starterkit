import { onBeforeUnmount, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

interface ToastPayload {
  severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  summary?: string
  detail?: string
  life?: number
}

export function useToastBridge() {
  const toast = useToast()
  const handler = (event: Event) => toast.add((event as CustomEvent<ToastPayload>).detail)
  onMounted(() => window.addEventListener('app:toast', handler))
  onBeforeUnmount(() => window.removeEventListener('app:toast', handler))
}
