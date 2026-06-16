<script setup lang="ts">
defineProps<{
  modelValue: string | number | undefined
  label: string
  prop?: string
  options: Array<{ label: string; value: string | number }>
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>

<template>
  <el-form-item :label="label" :prop="prop">
    <el-select class="w-full" :model-value="modelValue" :placeholder="placeholder || label" @update:model-value="emit('update:modelValue', $event)">
      <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
    </el-select>
  </el-form-item>
</template>
