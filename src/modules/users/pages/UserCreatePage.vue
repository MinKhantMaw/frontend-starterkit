<script setup>
import UserForm from '@/modules/users/components/UserForm.vue'
import { useCreate } from './useUserCreate'

const { users, form, rules, roleOptions, statusOptions, getError, submit, cancel } = useCreate()
</script>

<template>
  <UserForm
    v-model:model="form"
    :rules="rules"
    :loading="users.saving"
    submit-label="Create"
    :role-options="roleOptions"
    :status-options="statusOptions"
    :get-error="getError"
    @submit="submit"
    @cancel="cancel"
  />
</template>
