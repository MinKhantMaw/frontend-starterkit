<script setup>
import FilterBar from '@/components/common/FilterBar.vue'

defineProps({
  modelValue: { type: Object, default: () => ({}) },
  searchKey: { type: String, default: 'search' },
  searchPlaceholder: { type: String, default: 'Search' },
  showSearch: { type: Boolean, default: true },
  selectFilters: { type: Array, default: () => [] },
  showDateRange: { type: Boolean, default: false },
  dateRangeKey: { type: String, default: 'date_range' },
})

defineEmits(['update:modelValue', 'apply', 'reset'])
</script>

<template>
  <FilterBar
    :model-value="modelValue"
    :search-key="searchKey"
    :search-placeholder="searchPlaceholder"
    :show-search="showSearch"
    :select-filters="selectFilters"
    :show-date-range="showDateRange"
    :date-range-key="dateRangeKey"
    @update:model-value="$emit('update:modelValue', $event)"
    @apply="$emit('apply')"
    @reset="$emit('reset')"
  >
    <slot />
  </FilterBar>
</template>
