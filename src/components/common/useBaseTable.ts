import { computed, type MaybeRefOrGetter, toValue } from 'vue'

export interface BaseTableProps {
  data?: unknown[]
  loading?: boolean
  emptyText?: string
}

export function useBaseTable(props: MaybeRefOrGetter<BaseTableProps>) {
  const tableData = computed(() => toValue(props).data ?? [])
  const loadingState = computed(() => Boolean(toValue(props).loading))
  return { tableData, loadingState }
}
