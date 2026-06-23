<script setup>
import Button from 'primevue/button'

defineEmits(['apply', 'reset'])
</script>

<template>
  <div class="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
    <div class="grid gap-3 md:grid-cols-3">
      <slot />
    </div>
    <div class="flex gap-2">
      <Button label="Reset" severity="secondary" outlined @click="$emit('reset')" />
      <Button label="Filter" icon="pi pi-filter" @click="$emit('apply')" />
    </div>
  </div>
</template>
