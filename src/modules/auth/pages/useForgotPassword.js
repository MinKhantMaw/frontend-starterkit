import { reactive, ref } from 'vue'
import { authService } from '@/modules/auth/service'
import { notifySuccess } from '@/utils/notify'

export function useForgotPassword() {
  const loading = ref(false)
  const form = reactive({ email: '' })

  async function submit() {
    loading.value = true
    try {
      await authService.forgotPassword(form)
      notifySuccess('Password reset instructions sent')
    } finally {
      loading.value = false
    }
  }

  return { form, loading, submit }
}
