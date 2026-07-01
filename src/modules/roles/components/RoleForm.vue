<script setup>
import { computed } from 'vue'

const props = defineProps({
  rules: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  submitLabel: { type: String, required: true },
  groupedPermissions: { type: Object, required: true },
  getError: { type: Function, required: true },
  clearError: { type: Function, default: () => {} },
})

const emit = defineEmits(['submit', 'cancel'])

const formRef = defineModel('formRef')
const model = defineModel('model', { required: true })

const allPermissionNames = computed(() =>
  Object.values(props.groupedPermissions).flatMap((items) => items.map((permission) => permission.name)),
)

function actionLabel(permission) {
  return permission.split('.').at(-1) || permission
}

function isModuleChecked(items) {
  const names = items.map((permission) => permission.name)
  return names.length > 0 && names.every((permission) => model.value.permissions.includes(permission))
}

function isModuleIndeterminate(items) {
  const selected = items.filter((permission) => model.value.permissions.includes(permission.name)).length
  return selected > 0 && selected < items.length
}

function setModulePermissions(items, checked) {
  const names = items.map((permission) => permission.name)
  model.value.permissions = checked
    ? Array.from(new Set([...model.value.permissions, ...names]))
    : model.value.permissions.filter((permission) => !names.includes(permission))
}

const allChecked = computed(() => allPermissionNames.value.length > 0 && allPermissionNames.value.every((permission) => model.value.permissions.includes(permission)))
const allIndeterminate = computed(() => model.value.permissions.length > 0 && !allChecked.value)

function setAllPermissions(checked) {
  model.value.permissions = checked ? [...allPermissionNames.value] : []
}
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Role Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" @input="clearError('name')" />
      </el-form-item>
      <el-form-item label="Permissions" prop="permissions" :error="getError('permissions')">
        <div class="grid w-full gap-4">
          <div class="border-b border-slate-200 pb-3 dark:border-slate-700">
              <el-checkbox :model-value="allChecked" :indeterminate="allIndeterminate" @change="(checked) => { clearError('permissions'); setAllPermissions(checked) }">
              Select All
            </el-checkbox>
          </div>
          <section v-for="(items, module) in groupedPermissions" :key="module" class="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="text-sm font-medium capitalize">{{ String(module).replaceAll('_', ' ') }}</p>
              <el-checkbox :model-value="isModuleChecked(items)" :indeterminate="isModuleIndeterminate(items)" @change="(checked) => { clearError('permissions'); setModulePermissions(items, checked) }">
                Select All
              </el-checkbox>
            </div>
            <el-checkbox-group v-model="model.permissions" class="grid gap-2 md:grid-cols-2" @change="clearError('permissions')">
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
