import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue/useconfirm'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import type { Media } from '../service'
import { useMediaStore } from '../store'
import { notify } from '@/libs/notify'

export function useList() {
  const store = useMediaStore()
  const { items, loading } = storeToRefs(store)
  const grid = ref(true)
  
  const confirm = useConfirm()
  
  const load = () => store.fetchMedia()
  
  async function upload(event: FileUploadUploaderEvent) { const files = Array.isArray(event.files) ? event.files : [event.files]; await Promise.all(files.map((file) => { const data = new FormData(); data.append('file', file); return store.upload(data) })); notify('success', 'Upload complete', `${files.length} file(s) added`); await load() }
  
  function remove(item: Media) { confirm.require({ message: `Delete ${item.name ?? item.file_name ?? 'this file'}?`, header: 'Delete media', acceptProps: { label: 'Delete', severity: 'danger' }, accept: async () => { await store.remove(item.id); await load() } }) }
  
  onMounted(load)

  return { items, loading, grid, confirm, load, upload, remove }
}
