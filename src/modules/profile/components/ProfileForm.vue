<script setup>
import { User } from '@element-plus/icons-vue'

defineProps({
  rules: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  avatarLoading: { type: Boolean, default: false },
  avatarUrl: { type: String, default: '' },
  canSubmit: { type: Boolean, default: false },
  getError: { type: Function, required: true },
  clearError: { type: Function, default: () => {} },
})

const emit = defineEmits(['submit', 'upload-avatar', 'cancel'])
const formRef = defineModel('formRef')
const model = defineModel('model', { required: true })
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" @submit.prevent="emit('submit', formRef)">
    <div class="panel grid gap-4 p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <el-avatar :src="avatarUrl" :size="72">
          <el-icon :size="32"><User /></el-icon>
        </el-avatar>
        <div>
          <el-upload
            :show-file-list="false"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            :disabled="avatarLoading"
            :on-change="(file) => emit('upload-avatar', file)"
          >
            <el-button type="primary" plain :loading="avatarLoading" :disabled="avatarLoading">Upload avatar</el-button>
          </el-upload>
          <p class="mt-2 text-xs text-slate-500">JPG, PNG, or WebP. Maximum 2MB.</p>
        </div>
      </div>

      <el-form-item label="Name" prop="name" :error="getError('name')">
        <el-input v-model="model.name" @input="clearError('name')" />
      </el-form-item>
      <el-form-item label="Email" prop="email" :error="getError('email')">
        <el-input v-model="model.email" type="email" @input="clearError('email')" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone" :error="getError('phone')">
        <el-input v-model="model.phone" @input="clearError('phone')" />
      </el-form-item>
      <el-form-item label="Job Title" prop="jobTitle" :error="getError('jobTitle')">
        <el-input v-model="model.jobTitle" @input="clearError('jobTitle')" />
      </el-form-item>
      <div class="flex justify-end gap-2">
        <el-button @click="emit('cancel')">Cancel</el-button>
        <el-button v-if="canSubmit" type="primary" native-type="submit" :loading="loading" :disabled="loading">Save</el-button>
      </div>
    </div>
  </el-form>
</template>
