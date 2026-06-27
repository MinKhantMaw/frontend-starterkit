<script setup lang="ts">
import { computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RolePayload } from '@/types/role'
import type { PermissionRecord } from '@/types/permission'

const props = defineProps<{
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

const allPermissionNames = computed(() =>
  Object.values(props.groupedPermissions).flatMap((items) => items.map((permission) => permission.name)),
)

function actionLabel(permission: string): string {
  return permission.split('.').at(-1) || permission
}

function isModuleChecked(items: PermissionRecord[]): boolean {
  const names = items.map((permission) => permission.name)
  return names.length > 0 && names.every((permission) => model.value.permissions.includes(permission))
}

function isModuleIndeterminate(items: PermissionRecord[]): boolean {
  const selected = items.filter((permission) => model.value.permissions.includes(permission.name)).length
  return selected > 0 && selected < items.length
}

function setModulePermissions(items: PermissionRecord[], checked: boolean): void {
  const names = items.map((permission) => permission.name)
  model.value.permissions = checked
    ? Array.from(new Set([...model.value.permissions, ...names]))
    : model.value.permissions.filter((permission) => !names.includes(permission))
}

const allChecked = computed(() => allPermissionNames.value.length > 0 && allPermissionNames.value.every((permission) => model.value.permissions.includes(permission)))
const allIndeterminate = computed(() => model.value.permissions.length > 0 && !allChecked.value)

function setAllPermissions(checked: boolean): void {
  model.value.permissions = checked ? [...allPermissionNames.value] : []
}
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Role Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="Permissions" prop="permissions" :error="getError('permissions')">
        <div class="grid w-full gap-4">
          <div class="border-b border-slate-200 pb-3 dark:border-slate-700">
            <el-checkbox :model-value="allChecked" :indeterminate="allIndeterminate" @change="setAllPermissions">
              Select All
            </el-checkbox>
          </div>
          <section v-for="(items, module) in groupedPermissions" :key="module" class="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="text-sm font-medium capitalize">{{ String(module).replaceAll('_', ' ') }}</p>
              <el-checkbox :model-value="isModuleChecked(items)" :indeterminate="isModuleIndeterminate(items)" @change="(checked: boolean) => setModulePermissions(items, checked)">
                Select All
              </el-checkbox>
            </div>
            <el-checkbox-group v-model="model.permissions" class="grid gap-2 md:grid-cols-2">
              <el-checkbox v-for="permission in items" :key="permission.id" :label="permission.name" :value="permission.name">
                <span class="capitalize">{{ actionLabel(permission.name) }}</span>
              </el-checkbox>
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
