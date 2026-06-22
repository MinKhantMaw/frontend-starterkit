<script setup lang="ts">
import { useConfirmDialog } from './useConfirmDialog'

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
const { open } = useConfirmDialog(props, () => emit('confirm'))
defineExpose({ open })
</script>

<template>
  <slot :open="open" />
</template>
