<script setup>
defineProps({
  rules: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  submitLabel: { type: String, required: true },
  roleOptions: { type: Array, required: true },
  statusOptions: { type: Array, required: true },
  getError: { type: Function, required: true },
  clearError: { type: Function, default: () => {} },
})

const emit = defineEmits(['submit', 'cancel'])

const formRef = defineModel('formRef')
const model = defineModel('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <el-form-item label="Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" @input="clearError('name')" />
      </el-form-item>
      <el-form-item label="Email" prop="email" :error="getError('email')">
        <el-input v-model="model.email" type="email" @input="clearError('email')" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone" :error="getError('phone')">
        <el-input v-model="model.phone" @input="clearError('phone')" />
      </el-form-item>
      <div class="grid gap-4 md:grid-cols-2">
        <el-form-item label="Password" prop="password" :error="getError('password')">
          <el-input v-model="model.password" type="password" show-password @input="clearError('password')" />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password_confirmation" :error="getError('password_confirmation')">
          <el-input v-model="model.password_confirmation" type="password" show-password @input="clearError('password_confirmation')" />
        </el-form-item>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <el-form-item label="Roles" prop="role_ids" :error="getError('role_ids')">
          <el-select v-model="model.role_ids" class="w-full" multiple collapse-tags collapse-tags-tooltip @change="clearError('role_ids')">
            <el-option v-for="role in roleOptions" :key="role.value" :label="role.label" :value="role.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="status" :error="getError('status')">
          <el-select v-model="model.status" class="w-full" @change="clearError('status')">
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
