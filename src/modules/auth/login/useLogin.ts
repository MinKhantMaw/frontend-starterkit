import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/modules/auth/store'

export function useLogin() {
  const route = useRoute()
  
  const router = useRouter()
  
  const auth = useAuthStore()
  
  const formRef = ref<FormInstance>()
  
  const form = reactive({ email: '', password: '' })
  
  const rules: FormRules = {
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Enter a valid email', trigger: 'blur' },
    ],
    password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
  }
  
  async function submit() {
    await formRef.value?.validate()
    await auth.login(form)
    router.push((route.query.redirect as string) || '/dashboard')
  }

  return { route, router, auth, formRef, form, rules, submit }
}
