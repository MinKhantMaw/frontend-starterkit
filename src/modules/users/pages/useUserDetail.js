import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/modules/users/store';
export function useDetail() {
    const route = useRoute();
    const users = useUserStore();
    const id = String(route.params.id);
    onMounted(() => users.fetchUser(id));
    return { users };
}
