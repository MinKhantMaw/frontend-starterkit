<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import GlobalLoader from '@/components/GlobalLoader.vue'
import ToastBridge from '@/components/ToastBridge.vue'
</script>

<template>
  <RouterView />
  <Toast position="top-right" />
  <ConfirmDialog />
  <GlobalLoader />
  <ToastBridge />
</template>
