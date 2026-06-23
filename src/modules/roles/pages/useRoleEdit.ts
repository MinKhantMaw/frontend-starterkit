import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useFormErrors } from '@/composables/useFormErrors'
import { usePermissionStore } from '@/modules/permissions/store'
import { useRoleStore } from '@/modules/roles/store'
import { mapBackendErrorsToForm } from '@/utils/errorHandler'
import { notifyError } from '@/utils/notify'
import { roleRules } from '@/validations/role.rules'
import type { RolePayload } from '@/modules/roles/types'

export function useEdit() {
  const route = useRoute()
  const router = useRouter()
  const roles = useRoleStore()
  const permissions = usePermissionStore()
  const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors()
  const form = reactive<RolePayload>({ name: '', key: '', permissions: [] })
  const id = String(route.params.id)

  const groupedPermissions = computed(() => permissions.grouped)

  onMounted(async () => {
    await Promise.all([permissions.fetchPermissions(), roles.fetchRole(id)])
    Object.assign(form, roles.current || {})
  })

  async function submit(formRef?: FormInstance) {
    clearErrors()
    if (!(await formRef?.validate().catch(() => false))) return

    try {
      await roles.updateRole(id, form)
      router.push({ name: 'roles.detail', params: { id } })
    } catch (error) {
      if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
        notifyError('Failed to update role')
      }
    }
  }

  function cancel() {
    router.push({ name: 'roles.detail', params: { id } })
  }

  return { roles, form, errors, getError, hasError, rules: roleRules, groupedPermissions, submit, cancel }
}
