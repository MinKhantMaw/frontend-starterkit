<script setup>
import Button from 'primevue/button'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import BaseFilter from '@/components/common/SearchFilter.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionButton from '@/components/base/BaseButton.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useList } from './useRoleList'

const { roles, filters, columns, load, resetFilters, confirmDelete } = useList()
</script>

<template>
  <PageHeader title="Roles" description="Create reusable access roles for enterprise modules.">
    <template #actions>
      <PermissionGuard :permission="PERMISSIONS.ROLES_CREATE">
        <RouterLink to="/roles/create">
          <Button label="Create Role" icon="pi pi-plus" />
        </RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>

  <BaseTable :value="roles.items" :columns="columns" :loading="roles.loading">
    <template #filters>
      <BaseFilter @apply="load" @reset="resetFilters">
        <InputText v-model="filters.search" placeholder="Search roles" />
      </BaseFilter>
    </template>

    <Column header="Permissions">
      <template #body="{ data }">{{ data.permissions.length }}</template>
    </Column>
    <Column header="Actions" class="w-44">
      <template #body="{ data }">
        <div class="flex gap-1">
          <RouterLink :to="`/roles/${data.id}`">
            <Button icon="pi pi-eye" text rounded severity="secondary" aria-label="View" />
          </RouterLink>
          <PermissionGuard :permission="PERMISSIONS.ROLES_UPDATE">
            <RouterLink :to="`/roles/${data.id}/edit`">
              <Button icon="pi pi-pencil" text rounded severity="secondary" aria-label="Edit" />
            </RouterLink>
          </PermissionGuard>
          <PermissionButton :permission="PERMISSIONS.ROLES_DELETE" icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(data)" />
        </div>
      </template>
    </Column>
  </BaseTable>
</template>
