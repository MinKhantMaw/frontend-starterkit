<script setup>
import ProfileForm from '@/modules/profile/components/ProfileForm.vue'
import { useDetail } from './useProfile.js'

const { profile, form, rules, getError, clearError, canUpdate, avatarUrl, submit, uploadAvatar, cancel } = useDetail()
</script>

<template>
  <ProfileForm
    v-model:model="form"
    :rules="rules"
    :loading="profile.saving"
    :avatar-url="avatarUrl"
    :avatar-loading="profile.uploadingAvatar"
    :can-submit="canUpdate"
    :get-error="getError"
    :clear-error="clearError"
    @submit="submit"
    @upload-avatar="uploadAvatar"
    @cancel="cancel"
  />
</template>
