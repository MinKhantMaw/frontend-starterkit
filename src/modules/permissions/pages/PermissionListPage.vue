<script setup>
import InputText from 'primevue/inputtext'
import BaseFilter from '@/components/common/SearchFilter.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { usePermissionList } from './usePermissionList.js'

const { permissions, filters, groupedPermissions, hasPermissions, load, resetFilters } = usePermissionList()
</script>

<template>
  <PageHeader title="Permissions" description="System permissions available to roles and routes." />

  <section class="panel p-4">
    <BaseFilter @apply="load" @reset="resetFilters">
      <InputText v-model="filters.search" placeholder="Search permissions" />
    </BaseFilter>
  </section>

  <section v-if="permissions.loading" class="panel mt-4 p-8 text-center text-sm text-slate-500">
    Loading permissions...
  </section>

  <section v-else-if="!hasPermissions" class="panel mt-4 p-8 text-center text-sm text-slate-500">
    No permissions found.
  </section>

  <section v-else class="mt-4 grid gap-4 lg:grid-cols-2">
    <article v-for="(items, module) in groupedPermissions" :key="module" class="panel p-5">
      <h2 class="text-sm font-semibold capitalize">{{ module }}</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="permission in Array.isArray(items) ? items : []"
          :key="permission.id || permission.name"
          class="rounded-lg bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800"
        >
          {{ permission.name }}
        </span>
      </div>
    </article>
  </section>
</template>
