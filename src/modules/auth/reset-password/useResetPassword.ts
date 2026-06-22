import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authApi } from '../service'
import { notify } from '@/libs/notify'

export function useResetPassword() {
  const route = useRoute(), router = useRouter(), loading = ref(false)
  
  const form = reactive({ token: String(route.query.token ?? ''), email: String(route.query.email ?? ''), password: '', password_confirmation: '' })
  
  async function submit() { if (form.password !== form.password_confirmation) { notify('error', 'Passwords do not match'); return } loading.value = true; try { await authApi.resetPassword(form); notify('success', 'Password reset', 'You can now sign in.'); await router.push('/login') } finally { loading.value = false } }

  return { route, router, loading, form, submit }
}
