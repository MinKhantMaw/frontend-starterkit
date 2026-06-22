import { computed, type MaybeRefOrGetter, toValue } from 'vue'

const statusTypes: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
  active: 'success',
  inactive: 'danger',
  published: 'success',
  draft: 'warning',
  archived: 'info',
}

export function useStatusBadge(status: MaybeRefOrGetter<string | null | undefined>) {
  const statusType = computed(() => statusTypes[(toValue(status) ?? '').toLowerCase()] || 'info')
  const statusLabel = computed(() => toValue(status) ?? 'Unknown')
  return { statusType, statusLabel }
}
