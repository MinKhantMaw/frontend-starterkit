<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <PageHeader title="Profile" description="Authenticated administrator profile." />
  <el-card shadow="never" class="border border-slate-200">
    <div class="flex flex-col gap-6 md:flex-row">
      <el-avatar :size="96" :src="auth.user?.avatar || undefined">{{ auth.user?.name?.charAt(0) }}</el-avatar>
      <dl class="grid flex-1 gap-4 md:grid-cols-2">
        <div><dt class="text-sm text-slate-500">Name</dt><dd class="font-semibold">{{ auth.user?.name }}</dd></div>
        <div><dt class="text-sm text-slate-500">Email</dt><dd class="font-semibold">{{ auth.user?.email }}</dd></div>
        <div><dt class="text-sm text-slate-500">Roles</dt><dd class="font-semibold">{{ auth.roles.join(', ') || '-' }}</dd></div>
        <div><dt class="text-sm text-slate-500">Permissions</dt><dd class="font-semibold">{{ auth.permissions.length }}</dd></div>
      </dl>
    </div>
  </el-card>
</template>
