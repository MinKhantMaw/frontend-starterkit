<script setup>
import Button from 'primevue/button'
import PageHeader from '@/components/common/PageHeader.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { PERMISSIONS } from '@/constants/permissions'
import { useDetail } from './useUserDetail'

const { users } = useDetail()
</script>

<template>
  <PageHeader title="User Detail" description="Account profile and access attributes.">
    <template #actions>
      <PermissionGuard :permission="PERMISSIONS.USER_UPDATE">
        <RouterLink v-if="users.current" :to="`/users/${users.current.id}/edit`">
          <Button label="Edit" icon="pi pi-pencil" />
        </RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>

  <section class="panel p-5">
    <dl v-if="users.current" class="grid gap-4 md:grid-cols-2">
      <div>
        <dt class="muted">Name</dt>
        <dd class="font-medium">{{ users.current.name }}</dd>
      </div>
      <div>
        <dt class="muted">Email</dt>
        <dd class="font-medium">{{ users.current.email }}</dd>
      </div>
      <div>
        <dt class="muted">Phone</dt>
        <dd class="font-medium">{{ users.current.phone || '-' }}</dd>
      </div>
      <div>
        <dt class="muted">Role</dt>
        <dd class="font-medium">{{ users.current.role }}</dd>
      </div>
      <div>
        <dt class="muted">Status</dt>
        <dd class="font-medium capitalize">{{ users.current.status }}</dd>
      </div>
    </dl>
    <p v-else class="muted">User not found.</p>
  </section>
</template>
