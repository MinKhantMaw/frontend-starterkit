<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  prop?: string
  rows?: number
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <el-form-item :label="label" :prop="prop">
    <el-input
      :model-value="modelValue"
      type="textarea"
      :rows="rows || 4"
      :placeholder="placeholder || label"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </el-form-item>
</template>
