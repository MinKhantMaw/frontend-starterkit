import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { USER_STATUSES } from '@/constants/app';
import { useFormErrors } from '@/composables/useFormErrors';
import { useRoleStore } from '@/modules/roles/store';
import { useUserStore } from '@/modules/users/store';
import { mapBackendErrorsToForm } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
import { userCreateRules } from '@/validations/user.rules';
export function useCreate() {
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
    const roleOptions = computed(() => roleStore.roles.map((role) => ({
        label: role.name,
        value: role.id,
    })));
    onMounted(() => roleStore.fetchRoles());
    async function submit(formRef) {
        clearErrors();
        if (!(await formRef?.validate().catch(() => false)))
            return;
        try {
            await users.createUser(form);
            router.push({ name: 'users.list' });
        }
        catch (error) {
            if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
                notifyError('Failed to create user');
            }
        }
    }
    function cancel() {
        router.push({ name: 'users.list' });
    }
    return {
        users,
        form,
        errors,
        getError,
        clearError,
        hasError,
        rules: userCreateRules,
        roleOptions,
        statusOptions: USER_STATUSES,
        submit,
        cancel,
    };
}
