<script setup lang="ts">
import ProfileForm from '@/modules/profile/components/ProfileForm.vue'
import { useDetail } from './useProfile'

const { profile, form, rules, getError, canUpdate, submit, cancel } = useDetail()
</script>

<template>
  <ProfileForm
    v-model:model="form"
    :rules="rules"
    :loading="profile.saving"
    :can-submit="canUpdate"
    :get-error="getError"
    @submit="submit"
    @cancel="cancel"
  />
</template>
