<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
import { useSecuritySettingsStore } from '@/modules/security-settings/stores/securitySettingsStore'
import { PERMISSIONS } from '@/constants/permissions'
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'

const auth = useAuthStore()
const securitySettings = useSecuritySettingsStore()

const setupDialogVisible = ref(false)
const disableDialogVisible = ref(false)
const setupFormRef = ref()
const disableFormRef = ref()
const setupErrors = ref({})
const disableErrors = ref({})
const setupForm = reactive({ code: '' })
const disableForm = reactive({ password: '' })

const canUpdate = computed(() => auth.hasPermission(PERMISSIONS.SECURITY_SETTING_UPDATE))
const isEnabled = computed(() => securitySettings.isTwoFactorEnabled)
const statusLabel = computed(() => (isEnabled.value ? 'Enabled' : 'Disabled'))
const qrSvg = computed(() => securitySettings.setupData?.qr_code_svg || securitySettings.setupData?.qr_svg || '')
const manualSecret = computed(() => securitySettings.setupData?.secret || securitySettings.setupData?.manual_secret || '')

const setupRules = {
  code: [
    { required: true, message: 'OTP code is required', trigger: 'blur' },
    { min: 6, message: 'Enter a valid OTP code', trigger: 'blur' },
  ],
}

const disableRules = {
  password: [{ required: true, message: 'Current password is required', trigger: 'blur' }],
}

onMounted(() => {
  securitySettings.fetchSettings()
})

function getSetupError(field) {
  return setupErrors.value[field]?.[0] || ''
}

function getDisableError(field) {
  return disableErrors.value[field]?.[0] || ''
}

async function openSetupDialog() {
  setupErrors.value = {}
  setupForm.code = ''
  try {
    await securitySettings.startTwoFactorSetup()
    setupDialogVisible.value = true
  } catch (error) {
    notifyError(getApiErrorMessage(error, 'Unable to start 2FA setup'))
  }
}

async function confirmSetup() {
  if (securitySettings.loading) return
  setupErrors.value = {}

  const valid = await setupFormRef.value?.validate().catch(() => false)
  if (!valid) return

  try {
    await securitySettings.confirmTwoFactor(setupForm.code)
    setupDialogVisible.value = false
  } catch (error) {
    if (!mapBackendErrorsToForm(error, setupFormRef.value, (errors) => (setupErrors.value = errors))) {
      notifyError(getApiErrorMessage(error, 'Invalid OTP code'))
    }
  }
}

function openDisableDialog() {
  disableErrors.value = {}
  disableForm.password = ''
  disableDialogVisible.value = true
}

async function disableTwoFactor() {
  if (securitySettings.loading) return
  disableErrors.value = {}

  const valid = await disableFormRef.value?.validate().catch(() => false)
  if (!valid) return

  try {
    await securitySettings.disableTwoFactor(disableForm.password)
    disableDialogVisible.value = false
  } catch (error) {
    if (!mapBackendErrorsToForm(error, disableFormRef.value, (errors) => (disableErrors.value = errors))) {
      notifyError(getApiErrorMessage(error, 'Invalid password'))
    }
  }
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="page-title">Security Settings</h1>
    </div>

    <div v-loading="securitySettings.loading && !securitySettings.settings" class="panel p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Admin Two-Factor Authentication</h2>
          <p class="muted mt-1">Current status: {{ statusLabel }}</p>
        </div>

        <div v-if="canUpdate">
          <el-button
            v-if="!isEnabled"
            type="primary"
            :loading="securitySettings.loading"
            :disabled="securitySettings.loading"
            @click="openSetupDialog"
          >
            Enable 2FA
          </el-button>
          <el-button
            v-else
            type="danger"
            :loading="securitySettings.loading"
            :disabled="securitySettings.loading"
            @click="openDisableDialog"
          >
            Disable 2FA
          </el-button>
        </div>
      </div>
    </div>

    <el-dialog v-model="setupDialogVisible" title="Enable Admin 2FA" width="420px" destroy-on-close>
      <div class="space-y-4">
        <div v-if="qrSvg" class="flex justify-center" v-html="qrSvg" />
        <el-alert v-if="manualSecret" type="info" :closable="false">
          <template #title>
            Manual secret: <span class="font-mono">{{ manualSecret }}</span>
          </template>
        </el-alert>

        <el-form ref="setupFormRef" :model="setupForm" :rules="setupRules" label-position="top" @submit.prevent="confirmSetup">
          <el-form-item label="OTP Code" prop="code" :error="getSetupError('code')">
            <el-input v-model="setupForm.code" inputmode="numeric" autocomplete="one-time-code" maxlength="8" />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button :disabled="securitySettings.loading" @click="setupDialogVisible = false">Cancel</el-button>
        <el-button type="primary" :loading="securitySettings.loading" :disabled="securitySettings.loading" @click="confirmSetup">
          Confirm
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="disableDialogVisible" title="Disable Admin 2FA" width="420px" destroy-on-close>
      <el-form
        ref="disableFormRef"
        :model="disableForm"
        :rules="disableRules"
        label-position="top"
        @submit.prevent="disableTwoFactor"
      >
        <el-form-item label="Current Password" prop="password" :error="getDisableError('password')">
          <el-input v-model="disableForm.password" type="password" show-password autocomplete="current-password" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button :disabled="securitySettings.loading" @click="disableDialogVisible = false">Cancel</el-button>
        <el-button type="danger" :loading="securitySettings.loading" :disabled="securitySettings.loading" @click="disableTwoFactor">
          Disable 2FA
        </el-button>
      </template>
    </el-dialog>
  </section>
</template>
