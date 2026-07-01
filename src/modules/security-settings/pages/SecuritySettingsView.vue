<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
import { useSecuritySettingsStore } from '@/modules/security-settings/stores/securitySettingsStore'
import { PERMISSIONS } from '@/constants/permissions'
import { useConfirmAction } from '@/composables/useConfirmAction'
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'

const auth = useAuthStore()
const securitySettings = useSecuritySettingsStore()
const { confirmAction } = useConfirmAction()

const setupDialogVisible = ref(false)
const disableDialogVisible = ref(false)
const setupFormRef = ref()
const disableFormRef = ref()
const setupErrors = ref({})
const disableErrors = ref({})
const setupForm = reactive({ code: '' })
const disableForm = reactive({ password: '' })
const settingsForm = reactive({
  max_login_attempts: 5,
  lock_account_enabled: true,
  login_rate_limit_enabled: true,
  remember_me_enabled: true,
  password_history_count: 5,
  password_expiry_days: 90,
  force_password_change_enabled: false,
})

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

onMounted(async () => {
  await securitySettings.fetchSettings()
  syncSettingsForm()
})

function syncSettingsForm() {
  Object.assign(settingsForm, {
    max_login_attempts: securitySettings.settings?.max_login_attempts ?? 5,
    lock_account_enabled: securitySettings.settings?.lock_account_enabled ?? true,
    login_rate_limit_enabled: securitySettings.settings?.login_rate_limit_enabled ?? true,
    remember_me_enabled: securitySettings.settings?.remember_me_enabled ?? true,
    password_history_count: securitySettings.settings?.password_history_count ?? 5,
    password_expiry_days: securitySettings.settings?.password_expiry_days ?? 90,
    force_password_change_enabled: securitySettings.settings?.force_password_change_enabled ?? false,
  })
}

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
  confirmAction({
    message: 'Disable two-factor authentication for admin access?',
    header: 'Disable 2FA',
    acceptLabel: 'Continue',
    acceptClass: 'p-button-danger',
    onAccept: () => {
      disableErrors.value = {}
      disableForm.password = ''
      disableDialogVisible.value = true
    },
  })
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

async function saveSettings() {
  try {
    await securitySettings.updateSettings(settingsForm)
    syncSettingsForm()
  } catch (error) {
    notifyError(getApiErrorMessage(error, 'Unable to update security settings'))
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

    <div class="panel p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Authentication Policy</h2>
        <el-button v-if="canUpdate" type="primary" :loading="securitySettings.loading" @click="saveSettings">
          Save Settings
        </el-button>
      </div>

      <el-form :model="settingsForm" label-position="top" class="grid gap-4 md:grid-cols-2">
        <el-form-item label="Max Login Attempts">
          <el-input-number v-model="settingsForm.max_login_attempts" :min="1" :max="20" :disabled="!canUpdate" class="w-full" />
        </el-form-item>
        <el-form-item label="Password History Count">
          <el-input-number v-model="settingsForm.password_history_count" :min="1" :max="24" :disabled="!canUpdate" class="w-full" />
        </el-form-item>
        <el-form-item label="Password Expiry Days">
          <el-input-number v-model="settingsForm.password_expiry_days" :min="1" :max="365" :disabled="!canUpdate" class="w-full" />
        </el-form-item>
        <el-form-item label="Lock Account">
          <el-switch v-model="settingsForm.lock_account_enabled" :disabled="!canUpdate" />
        </el-form-item>
        <el-form-item label="Login Rate Limit">
          <el-switch v-model="settingsForm.login_rate_limit_enabled" :disabled="!canUpdate" />
        </el-form-item>
        <el-form-item label="Remember Me">
          <el-switch v-model="settingsForm.remember_me_enabled" :disabled="!canUpdate" />
        </el-form-item>
        <el-form-item label="Force Password Change">
          <el-switch v-model="settingsForm.force_password_change_enabled" :disabled="!canUpdate" />
        </el-form-item>
      </el-form>
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
