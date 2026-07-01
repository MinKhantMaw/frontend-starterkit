<script setup>
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  searchKey: { type: String, default: 'search' },
  searchPlaceholder: { type: String, default: 'Search' },
  showSearch: { type: Boolean, default: true },
  selectFilters: { type: Array, default: () => [] },
  showDateRange: { type: Boolean, default: false },
  dateRangeKey: { type: String, default: 'date_range' },
})

const emit = defineEmits(['update:modelValue', 'apply', 'reset'])

function updateField(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
  <div class="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
    <div class="grid gap-3 md:grid-cols-3">
      <slot>
        <InputText
          v-if="showSearch"
          :model-value="modelValue[searchKey]"
          :placeholder="searchPlaceholder"
          @update:model-value="updateField(searchKey, $event)"
        />

        <Select
          v-for="filter in selectFilters"
          :key="filter.key"
          :model-value="modelValue[filter.key]"
          :options="filter.options || []"
          :option-label="filter.optionLabel || 'label'"
          :option-value="filter.optionValue || 'value'"
          :placeholder="filter.placeholder || filter.label"
          show-clear
          @update:model-value="updateField(filter.key, $event)"
        />

        <DatePicker
          v-if="showDateRange"
          :model-value="modelValue[dateRangeKey]"
          selection-mode="range"
          date-format="yy-mm-dd"
          placeholder="Date range"
          show-icon
          @update:model-value="updateField(dateRangeKey, $event)"
        />
      </slot>
    </div>

    <div class="flex gap-2">
      <Button label="Reset" severity="secondary" outlined @click="$emit('reset')" />
      <Button label="Filter" icon="pi pi-filter" @click="$emit('apply')" />
    </div>
  </div>
</template>
