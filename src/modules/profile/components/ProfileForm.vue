<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { ProfilePayload } from '@/modules/profile/types'

defineProps<{
  rules: FormRules
  loading?: boolean
  canSubmit?: boolean
  getError: (field: string) => string
}>()

const emit = defineEmits<{ submit: [formRef: FormInstance | undefined]; cancel: [] }>()
const formRef = defineModel<FormInstance | undefined>('formRef')
const model = defineModel<ProfilePayload>('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="Email" prop="email" :error="getError('email')">
        <el-input v-model="model.email" type="email" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone" :error="getError('phone')">
        <el-input v-model="model.phone" />
      </el-form-item>
      <el-form-item label="Job Title" prop="jobTitle" :error="getError('jobTitle')">
        <el-input v-model="model.jobTitle" />
      </el-form-item>
      <div class="flex justify-end gap-2">
        <el-button @click="emit('cancel')">Cancel</el-button>
        <el-button v-if="canSubmit" type="primary" native-type="submit" :loading="loading" :disabled="loading">Save</el-button>
      </div>
    </div>
  </el-form>
</template>
