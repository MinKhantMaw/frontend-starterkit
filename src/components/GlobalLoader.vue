<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'
import { useGlobalLoader } from './useGlobalLoader'

const { app } = useGlobalLoader()
</script>

<template>
  <Transition name="fade">
    <ProgressBar v-if="app.loading" mode="indeterminate" class="!fixed inset-x-0 top-0 z-[100] !h-1 !rounded-none" />
  </Transition>
</template>
