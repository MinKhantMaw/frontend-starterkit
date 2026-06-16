<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    confirmText?: string
    type?: 'warning' | 'error' | 'info' | 'success'
  }>(),
  {
    title: 'Confirm action',
    message: 'This action cannot be undone.',
    confirmText: 'Confirm',
    type: 'warning',
  },
)

const emit = defineEmits<{ confirm: [] }>()

async function open() {
  await ElMessageBox.confirm(props.message, props.title, {
    confirmButtonText: props.confirmText,
    cancelButtonText: 'Cancel',
    type: props.type,
  })
  emit('confirm')
}

defineExpose({ open })
</script>

<template>
  <slot :open="open" />
</template>
