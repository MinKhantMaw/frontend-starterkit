<script setup>
import Button from 'primevue/button'

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  submitting: { type: Boolean, default: false },
  submitLabel: { type: String, default: 'Save' },
})

defineEmits(['submit', 'cancel'])
</script>

<template>
  <form class="panel" @submit.prevent="$emit('submit')">
    <div v-if="title || description" class="border-b border-slate-200 p-5 dark:border-slate-800">
      <h1 v-if="title" class="page-title">{{ title }}</h1>
      <p v-if="description" class="muted mt-1">{{ description }}</p>
    </div>
    <div class="grid gap-5 p-5">
      <slot />
    </div>
    <div class="flex items-center justify-end gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
      <slot name="actions">
        <Button type="button" label="Cancel" severity="secondary" outlined @click="$emit('cancel')" />
        <Button type="submit" :label="submitLabel" icon="pi pi-save" :loading="submitting" />
      </slot>
    </div>
  </form>
</template>
