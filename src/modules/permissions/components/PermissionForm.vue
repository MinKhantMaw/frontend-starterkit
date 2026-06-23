<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { PermissionPayload } from '@/types/permission'

defineProps<{
  rules: FormRules
  loading?: boolean
  getError: (field: string) => string
}>()

const emit = defineEmits<{ submit: [formRef: FormInstance | undefined]; cancel: [] }>()
const formRef = defineModel<FormInstance | undefined>('formRef')
const model = defineModel<PermissionPayload>('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Permission Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="Module" prop="module" :error="getError('module')">
        <el-input v-model="model.module" />
      </el-form-item>
      <div class="flex justify-end gap-2">
        <el-button @click="emit('cancel')">Cancel</el-button>
        <el-button type="primary" native-type="submit" :loading="loading" :disabled="loading">Save</el-button>
      </div>
    </div>
  </el-form>
</template>
