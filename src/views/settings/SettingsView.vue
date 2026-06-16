<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import PageHeader from '@/components/common/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'

const darkMode = ref(false)
const compactTables = ref(false)
const notifications = ref(true)
const auth = useAuthStore()
const formRef = ref<FormInstance>()
const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const rules: FormRules = {
  current_password: [{ required: true, message: 'Current password is required', trigger: 'blur' }],
  password: [{ required: true, min: 8, message: 'New password must be at least 8 characters', trigger: 'blur' }],
  password_confirmation: [
    { required: true, message: 'Password confirmation is required', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== passwordForm.password) callback(new Error('Password confirmation does not match'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
}

async function changePassword() {
  await formRef.value?.validate()
  await auth.changePassword(passwordForm)
  passwordForm.current_password = ''
  passwordForm.password = ''
  passwordForm.password_confirmation = ''
  formRef.value?.clearValidate()
}
</script>

<template>
  <PageHeader title="Settings" description="Local dashboard preferences." />
  <el-card shadow="never" class="border border-slate-200">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex items-center justify-between rounded border border-slate-200 p-4">
        <div>
          <h2 class="font-semibold text-slate-950">Dark mode</h2>
          <p class="text-sm text-slate-500">Toggle a darker workspace theme when implemented.</p>
        </div>
        <el-switch v-model="darkMode" />
      </div>
      <div class="flex items-center justify-between rounded border border-slate-200 p-4">
        <div>
          <h2 class="font-semibold text-slate-950">Compact tables</h2>
          <p class="text-sm text-slate-500">Prefer denser table rows for high-volume views.</p>
        </div>
        <el-switch v-model="compactTables" />
      </div>
      <div class="flex items-center justify-between rounded border border-slate-200 p-4">
        <div>
          <h2 class="font-semibold text-slate-950">Notifications</h2>
          <p class="text-sm text-slate-500">Show success and error toast messages.</p>
        </div>
        <el-switch v-model="notifications" />
      </div>
    </div>
  </el-card>

  <el-card shadow="never" class="mt-5 border border-slate-200">
    <template #header><span class="font-semibold">Change password</span></template>
    <el-form ref="formRef" :model="passwordForm" :rules="rules" label-position="top" class="max-w-xl" @submit.prevent="changePassword">
      <el-form-item label="Current password" prop="current_password">
        <el-input v-model="passwordForm.current_password" type="password" show-password />
      </el-form-item>
      <el-form-item label="New password" prop="password">
        <el-input v-model="passwordForm.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="Confirm new password" prop="password_confirmation">
        <el-input v-model="passwordForm.password_confirmation" type="password" show-password />
      </el-form-item>
      <el-button type="primary" native-type="submit" :loading="auth.loading">Update password</el-button>
    </el-form>
  </el-card>
</template>
