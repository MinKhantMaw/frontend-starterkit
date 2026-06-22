<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import FormInput from '@/components/form/FormInput.vue'
import { useEdit } from './useEdit'

const { roles, permissions, formRef, isEdit, form, rules, submit, titleCase } = useEdit()
</script>

<template>
  <PageHeader :title="isEdit ? 'Edit Role' : 'Create Role'" />
  <el-card shadow="never" class="border border-slate-200">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
      <FormInput v-model="form.name" label="Role name" prop="name" />
      <el-form-item label="Permissions">
        <div class="grid w-full gap-4 lg:grid-cols-2">
          <el-card v-for="(items, module) in permissions.grouped" :key="module" shadow="never" class="border border-slate-200">
            <template #header><span class="font-semibold">{{ titleCase(String(module)) }}</span></template>
            <el-checkbox-group v-model="form.permissions" class="grid gap-2">
              <el-checkbox v-for="permission in items" :key="permission.id" :label="permission.name">{{ permission.name }}</el-checkbox>
            </el-checkbox-group>
          </el-card>
        </div>
      </el-form-item>
      <div class="mt-4 flex justify-end gap-2">
        <RouterLink to="/roles"><el-button>Cancel</el-button></RouterLink>
        <el-button type="primary" native-type="submit" :loading="roles.loading">{{ isEdit ? 'Update' : 'Create' }}</el-button>
      </div>
    </el-form>
  </el-card>
</template>
