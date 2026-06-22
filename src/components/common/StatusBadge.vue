<script setup lang="ts">
import { useStatusBadge } from './useStatusBadge'

const props = defineProps<{ status?: string | null }>()
const { statusType, statusLabel } = useStatusBadge(() => props.status)
</script>

<template>
  <el-tag :type="statusType" effect="light" round>
    {{ statusLabel }}
  </el-tag>
</template>
