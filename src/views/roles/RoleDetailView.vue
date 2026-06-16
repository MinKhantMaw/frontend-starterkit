<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { useRoleStore } from '@/stores/roles'

const route = useRoute()
const roles = useRoleStore()

onMounted(() => roles.fetchRole(route.params.id as string))
</script>

<template>
  <PageHeader title="Role Detail">
    <template #actions>
      <PermissionGuard permission="role.update">
        <RouterLink :to="`/roles/${route.params.id}/edit`"><el-button type="primary">Edit role</el-button></RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>
  <LoadingSpinner v-if="roles.loading" />
  <el-card v-else-if="roles.current" shadow="never" class="border border-slate-200">
    <h2 class="text-xl font-semibold text-slate-950">{{ roles.current.name }}</h2>
    <p class="mt-1 text-sm text-slate-500">{{ roles.current.permissions?.length || 0 }} permissions assigned</p>
    <div class="mt-5 flex flex-wrap gap-2">
      <el-tag v-for="permission in roles.current.permissions" :key="permission.id" effect="light">{{ permission.name }}</el-tag>
    </div>
  </el-card>
</template>
