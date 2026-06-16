<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import PageHeader from "@/components/common/PageHeader.vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import ImageUpload from "@/components/form/ImageUpload.vue";
import { useUserStore } from "@/stores/users";
import { useRoleStore } from "@/stores/roles";

const route = useRoute();
const router = useRouter();
const users = useUserStore();
const roles = useRoleStore();
const formRef = ref<FormInstance>();
const isEdit = computed(() => Boolean(route.params.id));
const roleOptions = computed(() =>
  roles.roles.map((role) => ({ label: role.name, value: role.id })),
);

const form = reactive({
  name: "",
  email: "",
  password: "",
  status: "active",
  role_id: "" as string | number,
  avatar: null as File | string | null,
});

const rules: FormRules = {
  name: [{ required: true, message: "Name is required", trigger: "blur" }],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Enter a valid email", trigger: "blur" },
  ],
  password: [
    {
      required: !isEdit.value,
      message: "Password is required",
      trigger: "blur",
    },
  ],
  status: [
    { required: true, message: "Status is required", trigger: "change" },
  ],
  role_id: [{ required: true, message: "Role is required", trigger: "change" }],
};

async function submit() {
  await formRef.value?.validate();
  if (isEdit.value) {
    await users.updateUser(route.params.id as string, form);
  } else {
    await users.createUser(form);
  }
  router.push("/users");
}

onMounted(async () => {
  await roles.fetchRoles();
  if (isEdit.value) {
    await users.fetchUser(route.params.id as string);
    if (users.current) {
      form.name = users.current.name;
      form.email = users.current.email;
      form.status = users.current.status;
      form.role_id =
        users.current.roles?.[0]?.id ??
        (typeof users.current.role === "object"
          ? (users.current.role?.id ?? "")
          : "");
      form.avatar = users.current.avatar || null;
    }
  }
});
</script>

<template>
  <PageHeader :title="isEdit ? 'Edit User' : 'Create User'" />
  <el-card shadow="never" class="border border-slate-200">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      @submit.prevent="submit"
    >
      <div class="grid gap-5 lg:grid-cols-[1fr_180px]">
        <div class="grid gap-x-4 md:grid-cols-2">
          <FormInput v-model="form.name" label="Name" prop="name" />
          <FormInput
            v-model="form.email"
            label="Email"
            prop="email"
            type="email"
          />
          <FormInput
            v-model="form.password"
            label="Password"
            prop="password"
            type="password"
            :placeholder="
              isEdit ? 'Leave blank to keep current password' : 'Password'
            "
          />
          <FormSelect
            v-model="form.status"
            label="Status"
            prop="status"
            :options="[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]"
          />
          <FormSelect
            v-model="form.role_id"
            label="Role"
            prop="role_id"
            :options="roleOptions"
          />
        </div>
        <el-form-item label="Avatar">
          <ImageUpload v-model="form.avatar" />
        </el-form-item>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <RouterLink to="/users"><el-button>Cancel</el-button></RouterLink>
        <el-button
          type="primary"
          native-type="submit"
          :loading="users.loading"
          >{{ isEdit ? "Update" : "Create" }}</el-button
        >
      </div>
    </el-form>
  </el-card>
</template>
