import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ROLE_OPTIONS, USER_STATUSES } from '@/constants/app'
import { useFormErrors } from '@/composables/useFormErrors'
import { useUserStore } from '@/modules/users/store'
import { mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { userCreateRules } from '@/validations/user.rules'
import type { UserCreatePayload } from '@/modules/users/types'

export function useCreate() {
  const router = useRouter()
  const users = useUserStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()
  const form = reactive<UserCreatePayload>({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'operator',
    status: 'invited',
  })

  async function submit(formRef?: FormInstance) {
    clearErrors()
    if (!(await formRef?.validate().catch(() => false))) return

    try {
      await users.createUser(form)
      router.push({ name: 'users.list' })
    } catch (error) {
      if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
        notifyError('Failed to create user')
      }
    }
  }

  function cancel() {
    router.push({ name: 'users.list' })
  }

  return {
    users,
    form,
    errors,
    getError,
    hasError,
    rules: userCreateRules,
    roleOptions: ROLE_OPTIONS,
    statusOptions: USER_STATUSES,
    submit,
    cancel,
  }
}
