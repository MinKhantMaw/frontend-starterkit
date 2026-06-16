<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { useUserStore } from '@/stores/users'

const route = useRoute()
const users = useUserStore()

onMounted(() => users.fetchUser(route.params.id as string))
</script>

<template>
  <PageHeader title="User Detail">
    <template #actions>
      <PermissionGuard permission="user.update">
        <RouterLink :to="`/users/${route.params.id}/edit`"><el-button type="primary">Edit user</el-button></RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>
  <LoadingSpinner v-if="users.loading" />
  <el-card v-else-if="users.current" shadow="never" class="border border-slate-200">
    <div class="flex flex-col gap-6 md:flex-row">
      <el-avatar :size="96" :src="users.current.avatar || undefined">{{ users.current.name.charAt(0) }}</el-avatar>
      <dl class="grid flex-1 gap-4 md:grid-cols-2">
        <div><dt class="text-sm text-slate-500">Name</dt><dd class="font-semibold">{{ users.current.name }}</dd></div>
        <div><dt class="text-sm text-slate-500">Email</dt><dd class="font-semibold">{{ users.current.email }}</dd></div>
        <div><dt class="text-sm text-slate-500">Status</dt><dd><StatusBadge :status="users.current.status" /></dd></div>
        <div><dt class="text-sm text-slate-500">Role</dt><dd class="font-semibold">{{ users.current.roles?.[0]?.name || users.current.role || '-' }}</dd></div>
      </dl>
    </div>
  </el-card>
</template>
