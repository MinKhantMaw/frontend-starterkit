<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { ref } from 'vue'

const menu = ref<InstanceType<typeof Menu> | null>(null)

const items = [
  { label: 'No new notifications', icon: 'pi pi-check-circle', disabled: true },
]
</script>

<template>
  <Button icon="pi pi-bell" rounded text severity="secondary" aria-label="Notifications" @click="menu?.toggle($event)" />
  <Menu ref="menu" :model="items" popup />
</template>
