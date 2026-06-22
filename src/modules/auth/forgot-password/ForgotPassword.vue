<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useForgotPassword } from './useForgotPassword'

const { email, sent, loading, submit } = useForgotPassword()
</script>
<template><main class="grid min-h-screen place-items-center bg-slate-100 p-4 dark:bg-slate-950"><section class="panel w-full max-w-md p-7"><RouterLink to="/login" class="mb-6 inline-flex items-center gap-2 text-sm text-slate-500"><i class="pi pi-arrow-left" /> Back to login</RouterLink><div class="mb-6"><h1 class="text-2xl font-bold">Forgot password?</h1><p class="mt-2 text-sm text-slate-500">Enter your email and we’ll send a secure reset link.</p></div><div v-if="sent" class="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">Check your inbox for the password reset link.</div><form v-else class="space-y-4" @submit.prevent="submit"><div><label class="field-label">Email address</label><InputText v-model="email" type="email" class="!w-full" required autofocus /></div><Button type="submit" label="Send reset link" icon="pi pi-send" class="!w-full" :loading="loading" /></form></section></main></template>
