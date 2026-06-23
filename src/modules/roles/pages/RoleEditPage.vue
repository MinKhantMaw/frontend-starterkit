<script setup lang="ts">
import RoleForm from '@/modules/roles/components/RoleForm.vue'
import { useEdit } from './useRoleEdit'

const { roles, form, rules, groupedPermissions, getError, submit, cancel } = useEdit()
</script>

<template>
  <RoleForm
    v-model:model="form"
    :rules="rules"
    :loading="roles.saving"
    submit-label="Save"
    :grouped-permissions="groupedPermissions"
    :get-error="getError"
    @submit="submit"
    @cancel="cancel"
  />
</template>
