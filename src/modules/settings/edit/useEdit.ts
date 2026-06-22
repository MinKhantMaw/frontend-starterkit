import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import { useSettingsStore } from '../store'
import { useAuthStore } from '@/modules/auth/store'
import { notify } from '@/libs/notify'

export function useEdit() {
  const store = useSettingsStore()
  const { saving } = storeToRefs(store)
  const auth = useAuthStore(), logo = ref<File>(), favicon = ref<File>()
  
  const form = reactive({ site_name: '', site_url: '', site_email: '', site_description: '', facebook_url: '', instagram_url: '', linkedin_url: '', x_url: '', logo_url: '', favicon_url: '' })
  
  const password = reactive({ current_password: '', password: '', password_confirmation: '' })
  
  onMounted(async () => { await store.fetchSettings(); if (store.settings) Object.assign(form, store.settings) })
  
  function selectFile(event: FileUploadSelectEvent, type: 'logo' | 'favicon') { if (type === 'logo') logo.value = event.files[0]; else favicon.value = event.files[0] }
  
  async function save() { await store.updateSettings(form, logo.value, favicon.value); notify('success', 'Settings saved') }
  
  async function changePassword() { if (password.password !== password.password_confirmation) { notify('error', 'Passwords do not match'); return } await auth.changePassword(password); Object.assign(password, { current_password: '', password: '', password_confirmation: '' }) }

  return { saving, auth, logo, favicon, form, password, selectFile, save, changePassword }
}
