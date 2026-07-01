import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { USER_STATUSES } from '@/constants/app';
import { useFormErrors } from '@/composables/useFormErrors';
import { useRoleStore } from '@/modules/roles/store';
import { useUserStore } from '@/modules/users/store';
import { mapBackendErrorsToForm } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
import { userUpdateRules } from '@/validations/user.rules';
export function useEdit() {
    const route = useRoute();
    const router = useRouter();
    const users = useUserStore();
    const roleStore = useRoleStore();
    const { errors, setErrors, clearErrors, clearError, getError, hasError } = useFormErrors();
    const form = reactive({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role_ids: [],
        status: 'active',
    });
    const id = String(route.params.id);
    const roleOptions = computed(() => roleStore.roles.map((role) => ({
        label: role.name,
        value: role.id,
    })));
    onMounted(async () => {
        await Promise.all([users.fetchUser(id), roleStore.fetchRoles()]);
        Object.assign(form, users.current || {});
        form.role_ids = users.current?.role_ids?.length ? users.current.role_ids : users.current?.role_id ? [users.current.role_id] : form.role_ids;
        form.password = '';
        form.password_confirmation = '';
    });
    async function submit(formRef) {
        clearErrors();
        if (!(await formRef?.validate().catch(() => false)))
            return;
        try {
            await users.updateUser(id, form);
            router.push({ name: 'users.detail', params: { id } });
        }
        catch (error) {
            if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
                notifyError('Failed to update user');
            }
        }
    }
    function cancel() {
        router.push({ name: 'users.detail', params: { id } });
    }
    return {
        users,
        form,
        errors,
        getError,
        clearError,
        hasError,
        rules: userUpdateRules,
        roleOptions,
        statusOptions: USER_STATUSES,
        submit,
        cancel,
    };
}
