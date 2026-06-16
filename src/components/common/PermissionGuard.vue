<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ permission?: string | string[] }>()
const auth = useAuthStore()
const allowed = computed(() => auth.can(props.permission))
</script>

<template>
  <slot v-if="allowed" />
</template>
