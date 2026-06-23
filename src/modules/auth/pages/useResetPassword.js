import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '@/modules/auth/service'
import { notifySuccess } from '@/utils/notify'

export function useResetPassword() {
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const form = reactive({
    email: '',
    token: route.query.token || '',
    password: '',
    password_confirmation: '',
  })

  async function submit() {
    loading.value = true
    try {
      await authService.resetPassword(form)
      notifySuccess('Password reset complete')
      router.push({ name: 'login' })
    } finally {
      loading.value = false
    }
  }

  return { form, loading, submit }
}
