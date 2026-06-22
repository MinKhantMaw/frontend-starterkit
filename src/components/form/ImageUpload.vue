<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { useImageUpload } from './useImageUpload'

const props = defineProps<{ modelValue: File | string | null | undefined }>()
const emit = defineEmits<{ 'update:modelValue': [value: File | null] }>()

const { imageUrl, beforeUpload } = useImageUpload(() => props.modelValue, (value) => emit('update:modelValue', value))
</script>

<template>
  <el-upload class="image-uploader" :show-file-list="false" :before-upload="beforeUpload" accept="image/*">
    <img v-if="imageUrl" :src="imageUrl" class="h-36 w-36 rounded border object-cover" alt="Selected image" />
    <div v-else class="flex h-36 w-36 items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50">
      <el-icon class="text-xl text-slate-500"><Plus /></el-icon>
    </div>
  </el-upload>
</template>
