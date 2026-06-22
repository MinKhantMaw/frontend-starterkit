import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import { useAuthStore } from '@/modules/auth/store'
import { useProfileStore } from '../store'
import { notify } from '@/libs/notify'

export function useDetail() {
  const store = useProfileStore()
  const { saving } = storeToRefs(store)
  const auth = useAuthStore(), avatar = ref<File>()
  
  const form = reactive({ name: '', email: '', phone: '' })
  
  const avatarPreview = computed(() => avatar.value ? window.URL.createObjectURL(avatar.value) : auth.user?.avatar || undefined)
  
  onMounted(() => Object.assign(form, auth.user))
  
  async function save() { await store.updateProfile({ ...form, avatar: avatar.value }); await auth.fetchProfile(); notify('success', 'Profile updated') }
  
  function selectAvatar(event: FileUploadSelectEvent) { avatar.value = event.files[0] }

  return { auth, saving, avatar, form, avatarPreview, save, selectAvatar }
}
