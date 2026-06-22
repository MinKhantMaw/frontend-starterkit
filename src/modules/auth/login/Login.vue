<script setup lang="ts">
import { Lock, Message } from '@element-plus/icons-vue'
import { useLogin } from './useLogin'

const { auth, formRef, form, rules, submit } = useLogin()
</script>

<template>
  <main class="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_520px]">
    <section class="hidden bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center lg:block">
      <div class="flex h-full items-end bg-slate-950/45 p-12">
        <div class="max-w-2xl text-white">
          <h1 class="text-5xl font-bold">CMS Admin</h1>
          <p class="mt-4 text-lg text-slate-100">Manage users, roles, permissions, and published content from one focused workspace.</p>
        </div>
      </div>
    </section>
    <section class="flex items-center justify-center p-6">
      <el-card class="w-full max-w-md border-0 shadow-soft">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-slate-950">Sign in</h2>
          <p class="mt-1 text-sm text-slate-500">Use your administrator credentials.</p>
        </div>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" size="large" type="email" placeholder="admin@example.com">
              <template #prefix><el-icon><Message /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" size="large" type="password" show-password placeholder="Password">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <div class="-mt-2 mb-3 text-right"><RouterLink to="/forgot-password" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</RouterLink></div>
          <el-button class="mt-2 w-full" size="large" type="primary" native-type="submit" :loading="auth.loading">Login</el-button>
        </el-form>
      </el-card>
    </section>
  </main>
</template>
