<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useList } from './useList'

const { permissions, titleCase } = useList()
</script>

<template>
  <PageHeader title="Permission List" description="Available backend permissions grouped by module." />
  <LoadingSpinner v-if="permissions.loading" />
  <div v-else class="grid gap-4 lg:grid-cols-2">
    <el-card v-for="(items, module) in permissions.grouped" :key="module" shadow="never" class="border border-slate-200">
      <template #header><span class="font-semibold">{{ titleCase(String(module)) }}</span></template>
      <el-table :data="items">
        <el-table-column prop="name" label="Permission" />
      </el-table>
    </el-card>
  </div>
</template>
