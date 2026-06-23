<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { RolePayload } from '@/types/role'
import type { PermissionRecord } from '@/types/permission'

defineProps<{
  rules: FormRules
  loading?: boolean
  submitLabel: string
  groupedPermissions: Record<string, PermissionRecord[]>
  getError: (field: string) => string
}>()

const emit = defineEmits<{
  submit: [formRef: FormInstance | undefined]
  cancel: []
}>()

const formRef = defineModel<FormInstance | undefined>('formRef')
const model = defineModel<RolePayload>('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Role Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="Role Key" prop="key" :error="getError('key')">
        <el-input v-model="model.key" placeholder="finance_manager" />
      </el-form-item>
      <el-form-item label="Permissions" prop="permissions" :error="getError('permissions')">
        <div class="grid w-full gap-4">
          <section v-for="(items, module) in groupedPermissions" :key="module" class="rounded-lg border border-slate-200 p-4">
            <p class="mb-3 text-sm font-medium capitalize">{{ module }}</p>
            <el-checkbox-group v-model="model.permissions" class="grid gap-2 md:grid-cols-2">
              <el-checkbox v-for="permission in items" :key="permission.id" :label="permission.name" :value="permission.name" />
            </el-checkbox-group>
          </section>
        </div>
      </el-form-item>
      <div class="flex justify-end gap-2">
        <el-button @click="emit('cancel')">Cancel</el-button>
        <el-button type="primary" native-type="submit" :loading="loading" :disabled="loading">{{ submitLabel }}</el-button>
      </div>
    </div>
  </el-form>
</template>
