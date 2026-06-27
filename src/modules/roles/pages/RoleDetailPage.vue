<script setup>
import Button from 'primevue/button'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useDetail } from './useRoleDetail'

const { roles } = useDetail()
</script>

<template>
  <PageHeader title="Role Detail" description="Assigned permissions for this role.">
    <template #actions>
      <PermissionGuard :permission="PERMISSIONS.ROLE_UPDATE">
        <RouterLink v-if="roles.current" :to="`/roles/${roles.current.id}/edit`">
          <Button label="Edit" icon="pi pi-pencil" />
        </RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>

  <section class="panel p-5">
    <div v-if="roles.current">
      <h2 class="text-lg font-semibold">{{ roles.current.name }}</h2>
      <p v-if="roles.current.key" class="muted mt-1">{{ roles.current.key }}</p>
      <div class="mt-5 flex flex-wrap gap-2">
        <span v-for="permission in roles.current.permissions" :key="permission" class="rounded-lg bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
          {{ permission }}
        </span>
      </div>
    </div>
    <p v-else class="muted">Role not found.</p>
  </section>
</template>
