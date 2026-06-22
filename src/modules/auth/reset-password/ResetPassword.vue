<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useResetPassword } from './useResetPassword'

const { loading, form, submit } = useResetPassword()
</script>
<template><main class="grid min-h-screen place-items-center bg-slate-100 p-4 dark:bg-slate-950"><section class="panel w-full max-w-md p-7"><h1 class="text-2xl font-bold">Reset password</h1><p class="mb-6 mt-2 text-sm text-slate-500">Choose a strong new password for your account.</p><form class="space-y-4" @submit.prevent="submit"><div><label class="field-label">Email</label><InputText v-model="form.email" type="email" class="!w-full" required /></div><div><label class="field-label">New password</label><InputText v-model="form.password" type="password" minlength="8" class="!w-full" required /></div><div><label class="field-label">Confirm password</label><InputText v-model="form.password_confirmation" type="password" class="!w-full" required /></div><Button type="submit" label="Reset password" class="!w-full" :loading="loading" /></form></section></main></template>
