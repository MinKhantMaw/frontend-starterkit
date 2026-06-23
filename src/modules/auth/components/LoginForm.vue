<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginPayload } from '@/types/auth'

defineProps<{
  rules: FormRules
  loading?: boolean
  getError: (field: string) => string
}>()

const emit = defineEmits<{ submit: [formRef: FormInstance | undefined] }>()
const formRef = defineModel<FormInstance | undefined>('formRef')
const model = defineModel<LoginPayload>('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" class="panel w-full max-w-md p-6" @submit.prevent="emit('submit', formRef)">
    <div class="mb-6">
      <h1 class="page-title">Login</h1>
      <p class="muted mt-1">Access the enterprise administration workspace.</p>
    </div>
    <el-form-item label="Email" prop="email" :error="getError('email')">
      <el-input v-model="model.email" type="email" autocomplete="email" />
    </el-form-item>
    <el-form-item label="Password" prop="password" :error="getError('password')">
      <el-input v-model="model.password" type="password" show-password autocomplete="current-password" />
    </el-form-item>
    <div class="mb-4 flex items-center justify-between gap-3">
      <el-checkbox v-model="model.remember">Remember me</el-checkbox>
      <RouterLink class="text-sm font-medium text-cyan-700" to="/auth/forgot-password">Forgot password?</RouterLink>
    </div>
    <el-button class="w-full" type="primary" native-type="submit" :loading="loading" :disabled="loading">Login</el-button>
  </el-form>
</template>
