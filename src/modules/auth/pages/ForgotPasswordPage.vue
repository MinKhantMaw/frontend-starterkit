<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useForgotPassword } from './useForgotPassword'

const { form, loading, submit } = useForgotPassword()
</script>

<template>
  <form class="panel w-full max-w-md p-6" @submit.prevent="submit">
    <div class="mb-6">
      <h1 class="page-title">Forgot Password</h1>
      <p class="muted mt-1">Send reset instructions to an administrator email.</p>
    </div>
    <div class="grid gap-4">
      <label>
        <span class="field-label">Email</span>
        <InputText v-model="form.email" type="email" class="w-full" autocomplete="email" />
      </label>
      <Button type="submit" label="Send Instructions" icon="pi pi-envelope" :loading="loading" />
      <RouterLink class="text-sm font-medium text-cyan-700" to="/auth/login">Back to login</RouterLink>
    </div>
  </form>
</template>
