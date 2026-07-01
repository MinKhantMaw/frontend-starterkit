<script setup>
import Button from 'primevue/button'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import BaseFilter from '@/components/common/SearchFilter.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionButton from '@/components/base/BaseButton.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useList } from './useUserList'

const { users, filters, columns, pagination, roleOptions, statusOptions, load, applyFilters, resetFilters, confirmDelete } = useList()
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
      <BaseFilter @apply="applyFilters" @reset="resetFilters">
        <InputText v-model="filters.search" placeholder="Search users" />
        <Select v-model="filters.role" :options="roleOptions" option-label="label" option-value="value" placeholder="Role" show-clear />
        <Select v-model="filters.status" :options="statusOptions" option-label="label" option-value="value" placeholder="Status" show-clear />
      </BaseFilter>
    </template>

    <Column header="Actions" class="w-44">
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
