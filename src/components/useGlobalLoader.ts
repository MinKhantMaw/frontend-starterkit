import { useAppStore } from '@/modules/app/store'

export function useGlobalLoader() {
  return { app: useAppStore() }
}
