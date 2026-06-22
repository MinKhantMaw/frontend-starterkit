<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import PageTitle from '@/components/PageTitle.vue'
import { useDetail } from './useDetail'

const { auth, saving, form, avatarPreview, save, selectAvatar } = useDetail()
</script>
<template>
  <PageTitle title="Profile" description="Manage your administrator identity." />
  <section class="panel max-w-3xl p-6"><form class="grid gap-6 sm:grid-cols-[160px_1fr]" @submit.prevent="save"><div class="flex flex-col items-center gap-3"><Avatar :image="avatarPreview" :label="auth.user?.name?.[0]" shape="circle" class="!h-28 !w-28 !text-3xl" /><FileUpload mode="basic" accept="image/*" choose-label="Change photo" custom-upload @select="selectAvatar" /></div><div class="space-y-4"><div><label class="field-label">Full name</label><InputText v-model="form.name" class="!w-full" required /></div><div><label class="field-label">Email</label><InputText v-model="form.email" type="email" class="!w-full" required /></div><div><label class="field-label">Phone</label><InputText v-model="form.phone" class="!w-full" /></div><div><label class="field-label">Roles</label><p class="rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">{{ auth.roles.join(', ') || 'No assigned roles' }}</p></div><Button type="submit" label="Save profile" icon="pi pi-check" :loading="saving" /></div></form></section>
</template>
