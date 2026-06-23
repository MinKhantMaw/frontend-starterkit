<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/store'

const props = defineProps({
  permission: { type: [String, Array], default: null },
})

const auth = useAuthStore()
const allowed = computed(() => auth.hasPermission(props.permission))
</script>

<template>
  <slot v-if="allowed" />
</template>
