<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import ImageUpload from '@/components/form/ImageUpload.vue'
import { useCreate } from './useCreate'

const { users, formRef, isEdit, roleOptions, form, rules, submit } = useCreate()
</script>

<template>
  <PageHeader :title="isEdit ? 'Edit User' : 'Create User'" />
  <el-card shadow="never" class="border border-slate-200">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      @submit.prevent="submit"
    >
      <div class="grid gap-5 lg:grid-cols-[1fr_180px]">
        <div class="grid gap-x-4 md:grid-cols-2">
          <FormInput v-model="form.name" label="Name" prop="name" />
          <FormInput
            v-model="form.email"
            label="Email"
            prop="email"
            type="email"
          />
          <FormInput
            v-model="form.password"
            label="Password"
            prop="password"
            type="password"
            :placeholder="
              isEdit ? 'Leave blank to keep current password' : 'Password'
            "
          />
          <FormInput
            v-model="form.password_confirmation"
            label="Confirm Password"
            prop="password_confirmation"
            type="password"
            placeholder="Confirm password"
          />
          <FormSelect
            v-model="form.status"
            label="Status"
            prop="status"
            :options="[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]"
          />
          <FormSelect
            v-model="form.role_id"
            label="Role"
            prop="role_id"
            :options="roleOptions"
          />
        </div>
        <el-form-item label="Avatar">
          <ImageUpload v-model="form.avatar" />
        </el-form-item>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <RouterLink to="/users"><el-button>Cancel</el-button></RouterLink>
        <el-button
          type="primary"
          native-type="submit"
          :loading="users.loading"
          >{{ isEdit ? "Update" : "Create" }}</el-button
        >
      </div>
    </el-form>
  </el-card>
</template>
