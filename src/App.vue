<script setup>
import Toast from 'primevue/toast'
import BaseConfirmDialog from '@/components/base/ConfirmDialog.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import NotifierBridge from '@/components/common/NotifierBridge.vue'
</script>

<template>
  <RouterView />
  <Toast position="top-right" />
  <BaseConfirmDialog />
  <NotifierBridge />
  <LoadingOverlay />
</template>
