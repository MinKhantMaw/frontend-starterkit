import { computed, onMounted, reactive } from "vue";
import { useRoleStore } from "@/modules/roles/store";

export function useList() {
  const roles = useRoleStore();
  
  const filters = reactive({ page: 1, search: "" });
  
  const roleItems = computed(() => roles.roles ?? []);
  
  async function load(page = 1) {
    filters.page = page;
    await roles.fetchRoles(filters);
  }
  
  async function deleteRole(id: number) {
    await roles.deleteRole(id);
    await load(filters.page);
  }
  
  onMounted(() => load());

  return { roles, filters, roleItems, load, deleteRole }
}
