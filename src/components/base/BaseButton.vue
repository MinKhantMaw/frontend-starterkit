<script setup>
import Button from 'primevue/button'
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/store'

const props = defineProps({
  permission: { type: [String, Array], default: null },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  severity: { type: String, default: null },
  text: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})

defineEmits(['click'])

const auth = useAuthStore()
const allowed = computed(() => auth.hasPermission(props.permission))
</script>

<template>
  <Button
    v-if="allowed"
    :type="type"
    :label="label"
    :icon="icon"
    :severity="severity"
    :text="text"
    :rounded="rounded"
    :outlined="outlined"
    :loading="loading"
    @click="$emit('click', $event)"
  />
</template>
