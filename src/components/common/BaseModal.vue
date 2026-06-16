<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  width?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <el-dialog :model-value="modelValue" :title="title" :width="width || '520px'" @update:model-value="emit('update:modelValue', $event)">
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
