<script setup lang="ts">
import draggable from 'vuedraggable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import PageTitle from '@/components/PageTitle.vue'
import { useEdit } from './useEdit'

const { menus, selectedId, items, saving, newItem, add, remove, select, save } = useEdit()
</script>
<template>
  <PageTitle title="Menu Builder" description="Build nested navigation with drag and drop." />
  <div class="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
    <aside class="panel h-fit space-y-4 p-5"><div><label class="field-label">Menu</label><Select v-model="selectedId" :options="menus" option-label="name" option-value="id" class="!w-full" @change="select" /></div><hr class="border-slate-200 dark:border-slate-800" /><h2 class="font-semibold">Add custom link</h2><InputText v-model="newItem.label" placeholder="Label" class="!w-full" /><InputText v-model="newItem.url" placeholder="URL" class="!w-full" /><Button label="Add to menu" icon="pi pi-plus" outlined class="!w-full" @click="add" /></aside>
    <section class="panel p-5"><div class="mb-4 flex items-center justify-between"><div><h2 class="font-semibold">Menu structure</h2><small class="text-slate-500">Drag items to reorder or nest them.</small></div><Button label="Save menu" icon="pi pi-save" :loading="saving" @click="save" /></div>
      <draggable v-model="items" item-key="client_id" group="menu" handle=".handle" class="min-h-40 space-y-2 rounded-xl border-2 border-dashed border-slate-200 p-3 dark:border-slate-700">
        <template #item="{ element, index }"><div><div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"><i class="pi pi-bars handle cursor-grab text-slate-400" /><div class="min-w-0 flex-1"><b class="block truncate text-sm">{{ element.label }}</b><small class="truncate text-slate-500">{{ element.url }}</small></div><Button icon="pi pi-trash" text severity="danger" @click="remove(items, index)" /></div><draggable v-model="element.children" item-key="client_id" group="menu" class="ml-8 mt-2 min-h-3 space-y-2"><template #item="{ element: child, index: childIndex }"><div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"><i class="pi pi-bars handle cursor-grab text-slate-400" /><div class="flex-1"><b class="text-sm">{{ child.label }}</b><small class="ml-2 text-slate-500">{{ child.url }}</small></div><Button icon="pi pi-trash" text severity="danger" @click="remove(element.children, childIndex)" /></div></template></draggable></div></template>
      </draggable>
    </section>
  </div>
</template>
