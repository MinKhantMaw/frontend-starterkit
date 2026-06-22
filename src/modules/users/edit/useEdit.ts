import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/modules/users/store";
import { useRoleStore } from "@/modules/roles/store";
import type { User } from "@/libs/types";

export function useEdit() {
  const route = useRoute();
  
  const router = useRouter();
  
  const users = useUserStore();
  
  const roles = useRoleStore();
  
  const formRef = ref<FormInstance>();
  
  const isEdit = computed(() => Boolean(route.params.id));
  
  const roleOptions = computed(() =>
    roles.roles.map((role) => ({ label: role.name, value: role.id })),
  );
  
  function resolveUserRoleId(user: User) {
    const firstRole = user.roles?.[0] ?? user.role;
    if (!firstRole) return "";
  
    if (typeof firstRole === "object") {
      return firstRole.id;
    }
  
    const roleName = firstRole;
    const match = roles.roles.find(
      (role) => role.name === roleName || String(role.id) === roleName,
    );
  
    return match?.id ?? roleName;
  }
  
  const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    password_confirmation: [
      {
        validator: (_rule, value) => {
          if (!isEdit.value && !value) {
            return Promise.reject(new Error("Confirm password is required"));
          }
          if (form.password && value !== form.password) {
            return Promise.reject(new Error("Passwords do not match"));
          }
          return Promise.resolve();
        },
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
        form.role_id = resolveUserRoleId(users.current);
        form.avatar = users.current.avatar || null;
      }
    }
  });

  return { route, router, users, roles, formRef, isEdit, roleOptions, resolveUserRoleId, form, rules, submit }
}
