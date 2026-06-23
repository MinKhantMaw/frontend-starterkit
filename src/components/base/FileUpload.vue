<script setup lang="ts">
defineProps<{
  label?: string
  accept?: string
  error?: string
}>()

const emit = defineEmits<{
  select: [file: File]
}>()

function onChange(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) emit('select', file)
}
</script>

<template>
  <label class="block">
    <span class="field-label">{{ label || 'Upload file' }}</span>
    <input
      type="file"
      :accept="accept"
      class="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-cyan-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white dark:border-slate-700 dark:bg-slate-900"
      @change="onChange"
    />
    <span v-if="error" class="field-error">{{ error }}</span>
  </label>
</template>
