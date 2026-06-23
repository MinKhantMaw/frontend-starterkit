<script setup>
import Drawer from 'primevue/drawer'

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  position: { type: String, default: 'right' },
})

defineEmits(['update:visible'])
</script>

<template>
  <Drawer
    :visible="visible"
    :header="title"
    :position="position"
    class="!w-full sm:!w-[30rem]"
    @update:visible="$emit('update:visible', $event)"
  >
    <slot />
  </Drawer>
</template>
