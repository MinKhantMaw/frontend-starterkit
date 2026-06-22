import { computed, ref, type MaybeRefOrGetter, toValue } from 'vue'
import type { UploadProps } from 'element-plus'

export function useImageUpload(modelValue: MaybeRefOrGetter<File | string | null | undefined>, update: (value: File | null) => void) {
  const preview = ref<string | null>(typeof toValue(modelValue) === 'string' ? toValue(modelValue) as string : null)
  const imageUrl = computed(() => preview.value || (typeof toValue(modelValue) === 'string' ? toValue(modelValue) as string : ''))
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    update(file)
    preview.value = URL.createObjectURL(file)
    return false
  }
  return { imageUrl, beforeUpload }
}
