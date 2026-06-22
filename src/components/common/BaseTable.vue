<script setup lang="ts">
import { useBaseTable, type BaseTableProps } from './useBaseTable'

const props = defineProps<BaseTableProps>()
const { tableData, loadingState } = useBaseTable(() => props)
</script>

<template>
  <el-card shadow="never" class="border border-slate-200">
    <slot name="filters" />
    <el-table
      v-loading="loadingState"
      :data="tableData"
      class="mt-3 w-full"
      empty-text="No records found"
    >
      <slot />
      <template #empty>
        <div class="py-10 text-center text-slate-500">
          {{ emptyText || "No records found" }}
        </div>
      </template>
    </el-table>
  </el-card>
</template>
