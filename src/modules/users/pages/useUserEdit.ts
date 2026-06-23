import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ROLE_OPTIONS, USER_STATUSES } from '@/constants/app'
import { useFormErrors } from '@/composables/useFormErrors'
import { useUserStore } from '@/modules/users/store'
import { mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { userUpdateRules } from '@/validations/user.rules'
import type { UserUpdatePayload } from '@/modules/users/types'

export function useEdit() {
  const route = useRoute()
  const router = useRouter()
  const users = useUserStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()
  const form = reactive<UserUpdatePayload>({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'operator',
    status: 'active',
  })
  const id = String(route.params.id)

  onMounted(async () => {
    await users.fetchUser(id)
    Object.assign(form, users.current || {})
  })

  async function submit(formRef?: FormInstance) {
    clearErrors()
    if (!(await formRef?.validate().catch(() => false))) return

    try {
      await users.updateUser(id, form)
      router.push({ name: 'users.detail', params: { id } })
    } catch (error) {
      if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
        notifyError('Failed to update user')
      }
    }
  }

  function cancel() {
    router.push({ name: 'users.detail', params: { id } })
  }

  return {
    users,
    form,
    errors,
    getError,
    hasError,
    rules: userUpdateRules,
    roleOptions: ROLE_OPTIONS,
    statusOptions: USER_STATUSES,
    submit,
    cancel,
  }
}
