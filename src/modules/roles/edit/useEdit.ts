import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoleStore } from '@/modules/roles/store'
import { usePermissionStore } from '@/modules/permissions/store'
import { titleCase } from '@/libs/permissions'

export function useEdit() {
  const route = useRoute()
  
  const router = useRouter()
  
  const roles = useRoleStore()
  
  const permissions = usePermissionStore()
  
  const formRef = ref<FormInstance>()
  
  const isEdit = computed(() => Boolean(route.params.id))
  
  const form = reactive({
    name: '',
    permissions: [] as string[],
  })
  
  const rules: FormRules = {
    name: [{ required: true, message: 'Role name is required', trigger: 'blur' }],
  }
  
  async function submit() {
    await formRef.value?.validate()
    if (isEdit.value) {
      await roles.updateRole(route.params.id as string, form)
    } else {
      await roles.createRole(form)
    }
    router.push('/roles')
  }
  
  onMounted(async () => {
    await permissions.fetchPermissions()
    if (isEdit.value) {
      await roles.fetchRole(route.params.id as string)
      if (roles.current) {
        form.name = roles.current.name
        form.permissions = roles.current.permissions?.map((permission) => permission.name) ?? []
      }
    }
  })

  return { route, router, roles, permissions, formRef, isEdit, form, rules, submit, titleCase }
}
