<script setup>
import UserForm from '@/modules/users/components/UserForm.vue'
import { useEdit } from './useUserEdit'

const { users, form, rules, roleOptions, statusOptions, getError, clearError, submit, cancel } = useEdit()
</script>

<template>
  <UserForm
    v-model:model="form"
    :rules="rules"
    :loading="users.saving"
    submit-label="Save"
    :role-options="roleOptions"
    :status-options="statusOptions"
    :get-error="getError"
    :clear-error="clearError"
    @submit="submit"
    @cancel="cancel"
  />
</template>
