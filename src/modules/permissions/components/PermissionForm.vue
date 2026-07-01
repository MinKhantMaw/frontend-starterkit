<script setup>
defineProps({
  rules: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  getError: { type: Function, required: true },
})

const emit = defineEmits(['submit', 'cancel'])
const formRef = defineModel('formRef')
const model = defineModel('model', { required: true })
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
