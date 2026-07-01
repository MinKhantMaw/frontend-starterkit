<script setup>
import RoleForm from '@/modules/roles/components/RoleForm.vue'
import { useCreate } from './useRoleCreate'

const { roles, form, rules, groupedPermissions, getError, clearError, submit, cancel } = useCreate()
</script>

<template>
  <RoleForm
    v-model:model="form"
    :rules="rules"
    :loading="roles.saving"
    submit-label="Create"
    :grouped-permissions="groupedPermissions"
    :get-error="getError"
    :clear-error="clearError"
    @submit="submit"
    @cancel="cancel"
  />
</template>
