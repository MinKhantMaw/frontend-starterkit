<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
import { useProfileStore } from '@/modules/profile/store'
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'

const auth = useAuthStore()
const profile = useProfileStore()
const formRef = ref()
const fieldErrors = ref({})
const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const passwordRules = {
  current_password: [{ required: true, message: 'Current password is required', trigger: 'blur' }],
  password: [
    { required: true, message: 'New password is required', trigger: 'blur' },
    { min: 8, message: 'Password must be at least 8 characters', trigger: 'blur' },
  ],
  password_confirmation: [{ required: true, message: 'Confirm your new password', trigger: 'blur' }],
}

const activeDevices = computed(() => profile.devices || [])
const loginRows = computed(() => profile.loginHistory || [])

onMounted(() => Promise.all([profile.fetchLoginHistory(), profile.fetchDevices()]))

function setErrors(errors) {
  fieldErrors.value = errors
}

function getError(field) {
  return fieldErrors.value[field]?.[0] || ''
}

async function changePassword() {
  fieldErrors.value = {}
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  try {
    await profile.changePassword(form)
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
    formRef.value?.resetFields()
  } catch (error) {
    if (!mapBackendErrorsToForm(error, formRef.value, setErrors)) {
      notifyError(getApiErrorMessage(error, 'Failed to change password'))
    }
  }
}

async function revokeDevice(device) {
  try {
    await profile.revokeDevice(device.id)
  } catch (error) {
    notifyError(getApiErrorMessage(error, 'Failed to log out device'))
  }
}

async function logoutAll() {
  await auth.logoutAll()
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="page-title">Profile Security</h1>
    </div>

    <div class="panel p-6">
      <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Change Password</h2>
      <el-form ref="formRef" :model="form" :rules="passwordRules" label-position="top" @submit.prevent="changePassword">
        <el-form-item label="Current Password" prop="current_password" :error="getError('current_password')">
          <el-input v-model="form.current_password" type="password" show-password autocomplete="current-password" />
        </el-form-item>
        <el-form-item label="New Password" prop="password" :error="getError('password')">
          <el-input v-model="form.password" type="password" show-password autocomplete="new-password" />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password_confirmation" :error="getError('password_confirmation')">
          <el-input v-model="form.password_confirmation" type="password" show-password autocomplete="new-password" />
        </el-form-item>
        <el-button type="primary" :loading="profile.saving" @click="changePassword">Update Password</el-button>
      </el-form>
    </div>

    <div class="panel p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Devices</h2>
        <el-button type="danger" plain @click="logoutAll">Logout All Devices</el-button>
      </div>
      <el-table :data="activeDevices" v-loading="profile.loading">
        <el-table-column prop="device_name" label="Device" min-width="120" />
        <el-table-column prop="browser" label="Browser" min-width="120" />
        <el-table-column prop="ip_address" label="IP Address" min-width="140" />
        <el-table-column prop="last_activity_at" label="Last Activity" min-width="190" />
        <el-table-column label="Action" width="120">
          <template #default="{ row }">
            <el-button type="danger" link :disabled="row.is_current" @click="revokeDevice(row)">Logout</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="panel p-6">
      <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Login History</h2>
      <el-table :data="loginRows" v-loading="profile.loading">
        <el-table-column prop="email" label="Email" min-width="200" />
        <el-table-column prop="ip_address" label="IP Address" min-width="140" />
        <el-table-column label="Result" width="110">
          <template #default="{ row }">
            <el-tag :type="row.success ? 'success' : 'danger'">{{ row.success ? 'Success' : 'Failed' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="failure_reason" label="Failure Reason" min-width="160" />
        <el-table-column prop="logged_in_at" label="Logged In" min-width="190" />
        <el-table-column prop="logged_out_at" label="Logged Out" min-width="190" />
      </el-table>
    </div>
  </section>
</template>
