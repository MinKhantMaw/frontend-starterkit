<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { Delete, Edit, Plus, View } from "@element-plus/icons-vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BaseTable from "@/components/common/BaseTable.vue";
import BasePagination from "@/components/common/BasePagination.vue";
import PermissionGuard from "@/components/common/PermissionGuard.vue";
import { useRoleStore } from "@/stores/roles";

const roles = useRoleStore();
const filters = reactive({ page: 1, search: "" });
const roleItems = computed(() => roles.roles ?? []);

async function load(page = 1) {
  filters.page = page;
  await roles.fetchRoles(filters);
}

async function deleteRole(id: number) {
  await roles.deleteRole(id);
  await load(filters.page);
}

onMounted(() => load());
</script>

<template>
  <PageHeader
    title="Role Management"
    description="Create roles and assign permission groups."
  >
    <template #actions>
      <PermissionGuard permission="role.create">
        <RouterLink to="/roles/create"
          ><el-button type="primary" :icon="Plus"
            >Create role</el-button
          ></RouterLink
        >
      </PermissionGuard>
    </template>
  </PageHeader>
  <BaseTable :data="roleItems" :loading="roles.loading">
    <template #filters>
      <div class="flex gap-3">
        <el-input
          v-model="filters.search"
          clearable
          placeholder="Search roles"
          @keyup.enter="load()"
        />
        <el-button type="primary" @click="load()">Filter</el-button>
      </div>
    </template>
    <el-table-column prop="name" label="Name" min-width="180" />
    <el-table-column label="Permissions" min-width="160">
      <template #default="{ row }">{{ row.permissions?.length || 0 }}</template>
    </el-table-column>
    <el-table-column prop="users_count" label="Users" width="100" />
    <el-table-column label="Actions" width="180" fixed="right">
      <template #default="{ row }">
        <RouterLink :to="`/roles/${row.id}`"
          ><el-button :icon="View" text
        /></RouterLink>
        <PermissionGuard permission="role.update">
          <RouterLink :to="`/roles/${row.id}/edit`"
            ><el-button :icon="Edit" text
          /></RouterLink>
        </PermissionGuard>
        <PermissionGuard permission="role.delete">
          <el-popconfirm
            title="Delete this role?"
            confirm-button-text="Delete"
            @confirm="deleteRole(row.id)"
          >
            <template #reference
              ><el-button :icon="Delete" text type="danger"
            /></template>
          </el-popconfirm>
        </PermissionGuard>
      </template>
    </el-table-column>
  </BaseTable>
  <BasePagination :meta="roles.meta" @change="load" />
</template>
