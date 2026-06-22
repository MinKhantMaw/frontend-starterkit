<script setup lang="ts">
import { usePermissionGuard } from './usePermissionGuard'

const props = defineProps<{ permission?: string | string[] }>()
const { allowed } = usePermissionGuard(() => props.permission)
</script>

<template>
  <slot v-if="allowed" />
</template>
