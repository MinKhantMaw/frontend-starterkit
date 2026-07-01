<script setup>
import Button from 'primevue/button'
import Column from 'primevue/column'
import FilterBar from '@/components/common/FilterBar.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionButton from '@/components/base/BaseButton.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useList } from './useRoleList'

const { roles, filters, columns, pagination, load, resetFilters, confirmDelete } = useList()
</script>

<template>
  <PageHeader title="Roles" description="Create reusable access roles for enterprise modules.">
    <template #actions>
      <PermissionGuard :permission="PERMISSIONS.ROLE_CREATE">
        <RouterLink to="/roles/create">
          <Button label="Create Role" icon="pi pi-plus" />
        </RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>

  <BaseTable :data="Array.isArray(roles.roles) ? roles.roles : []" :columns="columns" :loading="roles.loading">
    <template #filters>
      <FilterBar
        :model-value="filters"
        search-placeholder="Search roles"
        @update:model-value="Object.assign(filters, $event)"
        @apply="load"
        @reset="resetFilters"
      />
    </template>

    <Column header="Actions" class="w-44">
      <template #body="{ data }">
        <div class="flex gap-1">
          <RouterLink :to="`/roles/${data.id}`">
            <Button icon="pi pi-eye" text rounded severity="secondary" aria-label="View" />
          </RouterLink>
          <PermissionGuard :permission="PERMISSIONS.ROLE_UPDATE">
            <RouterLink :to="`/roles/${data.id}/edit`">
              <Button icon="pi pi-pencil" text rounded severity="secondary" aria-label="Edit" />
            </RouterLink>
          </PermissionGuard>
          <PermissionButton :permission="PERMISSIONS.ROLE_DELETE" icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(data)" />
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
