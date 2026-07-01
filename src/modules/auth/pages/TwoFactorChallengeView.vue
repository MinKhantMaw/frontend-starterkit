<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'

const router = useRouter()
const auth = useAuthStore()
const formRef = ref()
const form = reactive({ code: '' })
const fieldErrors = ref({})

const rules = {
  code: [
    { required: true, message: 'OTP code is required', trigger: 'blur' },
    { min: 6, message: 'Enter a valid OTP code', trigger: 'blur' },
  ],
}

watchEffect(() => {
  if (!auth.temporaryTwoFactorToken && !auth.isAuthenticated) {
    router.replace({ name: 'login' })
  }
})

function setErrors(errors) {
  fieldErrors.value = errors
}

function getError(field) {
  return fieldErrors.value[field]?.[0] || ''
}

async function submit() {
  if (auth.loading) return
  fieldErrors.value = {}

  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  try {
    await auth.verifyTwoFactor(form.code)
    router.push({ name: 'dashboard' })
  } catch (error) {
    if (!mapBackendErrorsToForm(error, formRef.value, setErrors)) {
      notifyError(getApiErrorMessage(error, 'Invalid OTP code'))
    }
  }
}

function backToLogin() {
  auth.clearTwoFactorChallenge()
  router.push({ name: 'login' })
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    class="panel w-full max-w-md p-6"
    @submit.prevent="submit"
  >
    <div class="mb-6">
      <h1 class="page-title">Two-Factor Challenge</h1>
      <p class="muted mt-1">Enter the current code from your authenticator app.</p>
    </div>

    <el-form-item label="OTP Code" prop="code" :error="getError('code')">
      <el-input
        v-model="form.code"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="8"
        placeholder="123456"
      />
    </el-form-item>

    <el-button class="w-full" type="primary" native-type="submit" :loading="auth.loading" :disabled="auth.loading">
      Verify
    </el-button>
    <el-button class="mt-3 w-full" plain :disabled="auth.loading" @click="backToLogin">
      Back to login
    </el-button>
  </el-form>
</template>
