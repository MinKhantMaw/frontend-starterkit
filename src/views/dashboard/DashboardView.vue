<script setup lang="ts">
import { onMounted } from 'vue'
import { Document, Key, Lock, User, UserFilled } from '@element-plus/icons-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboard = useDashboardStore()

const statCards = [
  ['Total users', 'total_users', User],
  ['Active users', 'active_users', UserFilled],
  ['Total roles', 'total_roles', Lock],
  ['Total permissions', 'total_permissions', Key],
  ['Total contents', 'total_contents', Document],
  ['Published contents', 'published_contents', Document],
  ['Draft contents', 'draft_contents', Document],
] as const

onMounted(() => dashboard.fetchStats())
</script>

<template>
  <PageHeader title="Dashboard" description="Operational overview for your CMS." />
  <LoadingSpinner v-if="dashboard.loading" />
  <template v-else>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <el-card v-for="[label, key, icon] in statCards" :key="key" shadow="never" class="border border-slate-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">{{ label }}</p>
            <p class="mt-2 text-3xl font-semibold text-slate-950">{{ dashboard.stats[key] }}</p>
          </div>
          <div class="grid h-11 w-11 place-items-center rounded bg-brand-50 text-brand-700">
            <el-icon class="text-xl"><component :is="icon" /></el-icon>
          </div>
        </div>
      </el-card>
    </div>

    <div class="mt-6 grid gap-5 lg:grid-cols-2">
      <el-card shadow="never" class="border border-slate-200">
        <template #header><span class="font-semibold">Recent users</span></template>
        <el-table :data="dashboard.stats.recent_users" empty-text="No recent users">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="email" label="Email" />
          <el-table-column label="Status" width="120">
            <template #default="{ row }"><StatusBadge :status="row.status" /></template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="never" class="border border-slate-200">
        <template #header><span class="font-semibold">Recent contents</span></template>
        <el-table :data="dashboard.stats.recent_contents" empty-text="No recent contents">
          <el-table-column prop="title" label="Title" min-width="180" />
          <el-table-column label="Status" width="130">
            <template #default="{ row }"><StatusBadge :status="row.status" /></template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
</template>
