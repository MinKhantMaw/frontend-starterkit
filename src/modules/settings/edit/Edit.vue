<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import PageTitle from '@/components/PageTitle.vue'
import { useEdit } from './useEdit'

const { saving, form, password, selectFile, save, changePassword } = useEdit()
</script>
<template>
  <PageTitle title="Settings" description="Configure site identity, social links and security." />
  <div class="grid gap-5 xl:grid-cols-2"><form class="panel space-y-5 p-6" @submit.prevent="save"><h2 class="text-lg font-semibold">General settings</h2><div class="grid gap-4 sm:grid-cols-2"><div><label class="field-label">Site name</label><InputText v-model="form.site_name" class="!w-full" /></div><div><label class="field-label">Site URL</label><InputText v-model="form.site_url" class="!w-full" /></div></div><div><label class="field-label">Contact email</label><InputText v-model="form.site_email" type="email" class="!w-full" /></div><div><label class="field-label">Description</label><Textarea v-model="form.site_description" class="!w-full" rows="3" /></div><div class="grid gap-4 sm:grid-cols-2"><div><label class="field-label">Logo</label><img v-if="form.logo_url" :src="form.logo_url" class="mb-2 h-12 max-w-full object-contain" /><FileUpload mode="basic" accept="image/*" choose-label="Choose logo" custom-upload @select="selectFile($event, 'logo')" /></div><div><label class="field-label">Favicon</label><img v-if="form.favicon_url" :src="form.favicon_url" class="mb-2 h-10 w-10 object-contain" /><FileUpload mode="basic" accept="image/*" choose-label="Choose favicon" custom-upload @select="selectFile($event, 'favicon')" /></div></div><Button type="submit" label="Save settings" icon="pi pi-save" :loading="saving" /></form>
    <div class="space-y-5"><form class="panel space-y-4 p-6" @submit.prevent="save"><h2 class="text-lg font-semibold">Social links</h2><div v-for="field in ['facebook_url', 'instagram_url', 'linkedin_url', 'x_url'] as const" :key="field"><label class="field-label capitalize">{{ field.replace('_url', '').replace('x', 'X / Twitter') }}</label><InputText v-model="form[field]" class="!w-full" placeholder="https://" /></div><Button type="submit" label="Save links" /></form><form class="panel space-y-4 p-6" @submit.prevent="changePassword"><h2 class="text-lg font-semibold">Change password</h2><div><label class="field-label">Current password</label><InputText v-model="password.current_password" type="password" class="!w-full" required /></div><div><label class="field-label">New password</label><InputText v-model="password.password" type="password" class="!w-full" minlength="8" required /></div><div><label class="field-label">Confirm password</label><InputText v-model="password.password_confirmation" type="password" class="!w-full" required /></div><Button type="submit" label="Update password" /></form></div>
  </div>
</template>
