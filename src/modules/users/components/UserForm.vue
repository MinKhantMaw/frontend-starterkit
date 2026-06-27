<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { UserCreatePayload, UserUpdatePayload } from '@/types/user'

defineProps<{
  rules: FormRules
  loading?: boolean
  submitLabel: string
  roleOptions: readonly { label: string; value: string | number }[]
  statusOptions: readonly { label: string; value: string | number }[]
  getError: (field: string) => string
}>()

const emit = defineEmits<{
  submit: [formRef: FormInstance | undefined]
  cancel: []
}>()

const formRef = defineModel<FormInstance | undefined>('formRef')
const model = defineModel<UserCreatePayload | UserUpdatePayload>('model', { required: true })
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
      <div class="grid gap-4 md:grid-cols-2">
        <el-form-item label="Password" prop="password" :error="getError('password')">
          <el-input v-model="model.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password_confirmation" :error="getError('password_confirmation')">
          <el-input v-model="model.password_confirmation" type="password" show-password />
        </el-form-item>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <el-form-item label="Roles" prop="role_ids" :error="getError('role_ids')">
          <el-select v-model="model.role_ids" class="w-full" multiple collapse-tags collapse-tags-tooltip>
            <el-option v-for="role in roleOptions" :key="role.value" :label="role.label" :value="role.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="status" :error="getError('status')">
          <el-select v-model="model.status" class="w-full">
            <el-option v-for="status in statusOptions" :key="status.value" :label="status.label" :value="status.value" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex justify-end gap-2">
        <el-button @click="emit('cancel')">Cancel</el-button>
        <el-button type="primary" native-type="submit" :loading="loading" :disabled="loading">{{ submitLabel }}</el-button>
      </div>
    </div>
  </el-form>
</template>
