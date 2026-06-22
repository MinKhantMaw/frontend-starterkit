import { ref } from 'vue'
import { authApi } from '../service'
import { notify } from '@/libs/notify'

export function useForgotPassword() {
  const email = ref(''), sent = ref(false), loading = ref(false)
  
  async function submit() { loading.value = true; try { await authApi.forgotPassword(email.value); sent.value = true; notify('success', 'Reset link sent') } finally { loading.value = false } }

  return { email, sent, loading, submit }
}
