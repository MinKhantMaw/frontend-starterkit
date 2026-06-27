import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useFormErrors } from '@/composables/useFormErrors'
import { useAuthStore } from '@/modules/auth/store'
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { loginRules } from '@/validations/auth.rules'
import type { LoginPayload } from '@/types/auth'

export function useLogin() {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()

  const form = reactive<LoginPayload>({
    email: 'admin@example.com',
    password: 'password',
    remember: true,
  })

  async function submit(formRef?: FormInstance) {
    if (auth.loading) return

    clearErrors()
    if (!(await formRef?.validate().catch(() => false))) return

    try {
      await auth.login(form)
      router.push(route.query.redirect ? String(route.query.redirect) : { name: 'dashboard' })
    } catch (error) {
      if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
        notifyError(getApiErrorMessage(error, 'Invalid email or password'))
      }
    }
  }

  return { auth, form, errors, getError, hasError, rules: loginRules, submit }
}
