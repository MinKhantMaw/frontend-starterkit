<script setup lang="ts">
import LoginForm from '@/modules/auth/components/LoginForm.vue'
import { useLogin } from './useLogin'

const { auth, form, rules, getError, submit } = useLogin()
</script>

<template>
  <LoginForm v-model:model="form" :rules="rules" :loading="auth.loading" :get-error="getError" @submit="submit" />
</template>
