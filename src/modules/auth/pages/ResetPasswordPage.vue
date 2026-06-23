<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { useResetPassword } from './useResetPassword'

const { form, loading, submit } = useResetPassword()
</script>

<template>
  <form class="panel w-full max-w-md p-6" @submit.prevent="submit">
    <div class="mb-6">
      <h1 class="page-title">Reset Password</h1>
      <p class="muted mt-1">Set a new password for the account.</p>
    </div>
    <div class="grid gap-4">
      <label>
        <span class="field-label">Email</span>
        <InputText v-model="form.email" type="email" class="w-full" />
      </label>
      <label>
        <span class="field-label">Token</span>
        <InputText v-model="form.token" class="w-full" />
      </label>
      <label>
        <span class="field-label">Password</span>
        <Password v-model="form.password" class="w-full" input-class="w-full" toggle-mask />
      </label>
      <label>
        <span class="field-label">Confirm Password</span>
        <Password v-model="form.password_confirmation" class="w-full" input-class="w-full" toggle-mask :feedback="false" />
      </label>
      <Button type="submit" label="Reset Password" icon="pi pi-key" :loading="loading" />
    </div>
  </form>
</template>
