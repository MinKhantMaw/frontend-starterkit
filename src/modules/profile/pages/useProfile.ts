import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { PERMISSIONS } from '@/constants/permissions'
import { useFormErrors } from '@/composables/useFormErrors'
import { useAuthStore } from '@/modules/auth/store'
import { useProfileStore } from '@/modules/profile/store'
import { mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { profileRules } from '@/validations/profile.rules'
import type { ProfilePayload } from '@/modules/profile/types'

export function useDetail() {
  const router = useRouter()
  const auth = useAuthStore()
  const profile = useProfileStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()
  const form = reactive<ProfilePayload>({ name: '', email: '', phone: '', jobTitle: '' })
  const canUpdate = computed(() => auth.hasPermission(PERMISSIONS.PROFILE_UPDATE))

  onMounted(async () => {
    await profile.fetchProfile()
    Object.assign(form, profile.profile || {})
  })

  async function submit(formRef?: FormInstance) {
    if (!canUpdate.value) return
    clearErrors()
    if (!(await formRef?.validate().catch(() => false))) return

    try {
      await profile.updateProfile(form)
    } catch (error) {
      if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
        notifyError('Failed to update profile')
      }
    }
  }

  function cancel() {
    router.back()
  }

  return { profile, form, errors, getError, hasError, rules: profileRules, canUpdate, submit, cancel }
}
