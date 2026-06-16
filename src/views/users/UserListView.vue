<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { Delete, Edit, Plus, View } from "@element-plus/icons-vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BaseTable from "@/components/common/BaseTable.vue";
import BasePagination from "@/components/common/BasePagination.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import PermissionGuard from "@/components/common/PermissionGuard.vue";
import { useUserStore } from "@/stores/users";
import { useRoleStore } from "@/stores/roles";

const users = useUserStore();
const roles = useRoleStore();
const filters = reactive({ page: 1, search: "", status: "", role_id: "" });
const roleItems = computed(() => roles.roles ?? []);

async function load(page = 1) {
  filters.page = page;
  await users.fetchUsers(filters);
}

async function deleteUser(id: number) {
  await users.deleteUser(id);
  await load(filters.page);
}

async function toggleStatus(id: number, status: string) {
  await users.setUserStatus(id, status === "active" ? "inactive" : "active");
  await load(filters.page);
}

onMounted(async () => {
  await Promise.all([roles.fetchRoles(), load()]);
});
</script>

<template>
  <PageHeader
    title="User Management"
    description="Search, create, edit, and manage administrator users."
  >
    <template #actions>
      <PermissionGuard permission="user.create">
        <RouterLink to="/users/create"
          ><el-button type="primary" :icon="Plus"
            >Create user</el-button
          ></RouterLink
        >
      </PermissionGuard>
    </template>
  </PageHeader>

  <BaseTable
    :data="users.users"
    :loading="users.loading"
    empty-text="No users match your filters"
  >
    <template #filters>
      <div class="grid gap-3 md:grid-cols-4">
        <el-input
          v-model="filters.search"
          clearable
          placeholder="Search users"
          @keyup.enter="load()"
        />
        <el-select v-model="filters.status" clearable placeholder="Status">
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
        <el-select v-model="filters.role_id" clearable placeholder="Role">
          <el-option
            v-for="role in roleItems"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          />
        </el-select>
        <el-button type="primary" @click="load()">Filter</el-button>
      </div>
    </template>
    <el-table-column prop="name" label="Name" min-width="160" />
    <el-table-column prop="email" label="Email" min-width="220" />
    <el-table-column label="Role" min-width="140">
      <template #default="{ row }">{{
        row.role?.name || row.role || row.roles?.[0]?.name || "-"
      }}</template>
    </el-table-column>
    <el-table-column label="Status" width="120">
      <template #default="{ row }"
        ><StatusBadge :status="row.status"
      /></template>
    </el-table-column>
    <el-table-column label="Actions" width="250" fixed="right">
      <template #default="{ row }">
        <div class="flex flex-wrap gap-1">
          <RouterLink :to="`/users/${row.id}`"
            ><el-button :icon="View" text
          /></RouterLink>
          <PermissionGuard permission="user.update">
            <RouterLink :to="`/users/${row.id}/edit`"
              ><el-button :icon="Edit" text
            /></RouterLink>
            <el-button text @click="toggleStatus(row.id, row.status)">{{
              row.status === "active" ? "Deactivate" : "Activate"
            }}</el-button>
          </PermissionGuard>
          <PermissionGuard permission="user.delete">
            <el-popconfirm
              title="Delete this user?"
              confirm-button-text="Delete"
              @confirm="deleteUser(row.id)"
            >
              <template #reference
                ><el-button :icon="Delete" text type="danger"
              /></template>
            </el-popconfirm>
          </PermissionGuard>
        </div>
      </template>
    </el-table-column>
  </BaseTable>
  <BasePagination :meta="users.meta" @change="load" />
</template>
