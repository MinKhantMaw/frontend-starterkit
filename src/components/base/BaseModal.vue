<script setup>
import Dialog from 'primevue/dialog'

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: String, default: '32rem' },
})

defineEmits(['update:visible'])
</script>

<template>
  <Dialog
    :visible="visible"
    :header="title"
    modal
    :style="{ width }"
    @update:visible="$emit('update:visible', $event)"
  >
    <slot />
  </Dialog>
</template>
