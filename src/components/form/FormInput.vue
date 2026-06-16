<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  prop?: string
  type?: string
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <el-form-item :label="label" :prop="prop">
    <el-input :model-value="modelValue" :type="type || 'text'" :placeholder="placeholder || label" @update:model-value="emit('update:modelValue', $event)" />
  </el-form-item>
</template>
