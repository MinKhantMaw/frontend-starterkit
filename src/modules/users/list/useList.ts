import { computed, onMounted, reactive } from "vue";
import { useUserStore } from "@/modules/users/store";
import { useRoleStore } from "@/modules/roles/store";

export function useList() {
  const users = useUserStore();
  
  const roles = useRoleStore();
  
  const filters = reactive({ page: 1, search: "", status: "", role_id: "" });
  
  const userItems = computed(() => users.users ?? []);
  
  const roleItems = computed(() => roles.roles ?? []);
  
  function displayRoles(row: { roles?: Array<{ name?: string } | string>; role?: { name?: string } | string }) {
    if (Array.isArray(row.roles)) return row.roles.map((role) => typeof role === 'string' ? role : role.name ?? '').filter(Boolean).join(', ')
    return typeof row.role === 'string' ? row.role : row.role?.name ?? '-'
  }
  
  async function load(page = 1) {
    filters.page = page;
    await users.fetchUsers(filters);
  }
  
  async function deleteUser(id: number) {
    await users.deleteUser(id);
    await load(filters.page);
  }
  
  async function toggleStatus(id: number, status: string) {
    await users.setUserStatus(id, status === "active" ? "inactive" : "active");
    await load(filters.page);
  }
  
  onMounted(async () => {
    await Promise.all([roles.fetchRoles(), load()]);
  });

  return { users, roles, filters, userItems, roleItems, displayRoles, load, deleteUser, toggleStatus }
}
