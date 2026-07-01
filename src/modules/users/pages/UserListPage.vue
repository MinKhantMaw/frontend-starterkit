<script setup>
import Button from 'primevue/button'
import Column from 'primevue/column'
import FilterBar from '@/components/common/FilterBar.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionButton from '@/components/base/BaseButton.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import StatusBadge from '@/components/base/StatusBadge.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useList } from './useUserList'

const { users, filters, columns, pagination, roleOptions, statusOptions, load, applyFilters, resetFilters, confirmDelete, reactivate } = useList()
</script>

<template>
  <PageHeader title="Users" description="Reusable user administration CRUD pattern.">
    <template #actions>
      <PermissionGuard :permission="PERMISSIONS.USER_CREATE">
        <RouterLink to="/users/create">
          <Button label="Create User" icon="pi pi-plus" />
        </RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>

  <BaseTable :data="Array.isArray(users.users) ? users.users : []" :columns="columns" :loading="users.loading">
    <template #filters>
      <FilterBar
        :model-value="filters"
        search-placeholder="Search users"
        :select-filters="[
          { key: 'role_id', options: roleOptions, placeholder: 'Role' },
          { key: 'status', options: statusOptions, placeholder: 'Status' },
        ]"
        @update:model-value="Object.assign(filters, $event)"
        @apply="applyFilters"
        @reset="resetFilters"
      />
    </template>

    <Column header="Status" class="w-36">
      <template #body="{ data }">
        <div class="flex flex-col gap-1">
          <StatusBadge :status="data.status" />
          <el-tag v-if="data.is_locked || data.locked_at" type="danger" size="small">Locked</el-tag>
        </div>
      </template>
    </Column>

    <Column header="Security" class="w-52">
      <template #body="{ data }">
        <div class="text-sm text-slate-600 dark:text-slate-300">
          <div>Failed: {{ data.failed_login_attempts || 0 }}</div>
          <div v-if="data.locked_at" class="truncate">Locked: {{ data.locked_at }}</div>
        </div>
      </template>
    </Column>

    <Column header="Actions" class="w-56">
      <template #body="{ data }">
        <div class="flex gap-1">
          <RouterLink :to="`/users/${data.id}`">
            <Button icon="pi pi-eye" text rounded severity="secondary" aria-label="View" />
          </RouterLink>
          <PermissionGuard :permission="PERMISSIONS.USER_UPDATE">
            <RouterLink :to="`/users/${data.id}/edit`">
              <Button icon="pi pi-pencil" text rounded severity="secondary" aria-label="Edit" />
            </RouterLink>
          </PermissionGuard>
          <PermissionGuard :permission="PERMISSIONS.USER_UPDATE">
            <Button
              v-if="data.status === 'inactive'"
              icon="pi pi-lock-open"
              text
              rounded
              severity="success"
              aria-label="Reactivate"
              @click="reactivate(data)"
            />
          </PermissionGuard>
          <PermissionButton :permission="PERMISSIONS.USER_DELETE" icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(data)" />
        </div>
      </template>
    </Column>
  </BaseTable>

  <BasePagination
    :page="pagination.current_page"
    :per-page="pagination.per_page"
    :total="pagination.total"
    @change="load($event.page, $event.perPage)"
  />
</template>
