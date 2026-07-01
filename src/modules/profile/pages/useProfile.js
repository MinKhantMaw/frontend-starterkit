import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PERMISSIONS } from '@/constants/permissions'
import { useFormErrors } from '@/composables/useFormErrors'
import { useAuthStore } from '@/modules/auth/store'
import { useProfileStore } from '@/modules/profile/store'
import { mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { profileRules } from '@/validations/profile.rules'

const allowedAvatarTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxAvatarSize = 2 * 1024 * 1024

export function useDetail() {
  const router = useRouter()
  const auth = useAuthStore()
  const profile = useProfileStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()
  const form = reactive({ name: '', email: '', phone: '', jobTitle: '' })
  const avatarPreview = ref('')
  const canUpdate = computed(() => auth.hasPermission(PERMISSIONS.PROFILE_UPDATE))
  const avatarUrl = computed(() => avatarPreview.value || profile.profile?.avatar_url || auth.user?.avatar_url || '')

  onMounted(async () => {
    await profile.fetchProfile()
    Object.assign(form, profile.profile || {})
  })

  async function submit(formRef) {
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

  async function uploadAvatar(uploadFile) {
    const file = uploadFile?.raw || uploadFile
    if (!file) return false

    if (!allowedAvatarTypes.includes(file.type)) {
      notifyError('Avatar must be a JPG, PNG, or WebP image')
      return false
    }

    if (file.size > maxAvatarSize) {
      notifyError('Avatar must be 2MB or smaller')
      return false
    }

    avatarPreview.value = window.URL.createObjectURL(file)

    try {
      await profile.uploadAvatar(file)
      avatarPreview.value = ''
    } catch {
      notifyError('Failed to upload avatar')
    }

    return false
  }

  function cancel() {
    router.back()
  }

  return {
    profile,
    form,
    errors,
    getError,
    hasError,
    rules: profileRules,
    canUpdate,
    avatarUrl,
    submit,
    uploadAvatar,
    cancel,
  }
}
