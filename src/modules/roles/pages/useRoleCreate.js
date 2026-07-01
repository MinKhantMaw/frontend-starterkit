import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useFormErrors } from '@/composables/useFormErrors';
import { usePermissionStore } from '@/modules/permissions/store';
import { useRoleStore } from '@/modules/roles/store';
import { mapBackendErrorsToForm } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
import { roleRules } from '@/validations/role.rules';
export function useCreate() {
    const router = useRouter();
    const roles = useRoleStore();
    const permissions = usePermissionStore();
    const { errors, setErrors, clearErrors, clearError, getError, hasError } = useFormErrors();
    const form = reactive({ name: '', permissions: [] });
    const groupedPermissions = computed(() => permissions.grouped);
    onMounted(() => permissions.fetchPermissions());
    async function submit(formRef) {
        clearErrors();
        if (!(await formRef?.validate().catch(() => false)))
            return;
        try {
            await roles.createRole(form);
            router.push({ name: 'roles.list' });
        }
        catch (error) {
            if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
                notifyError('Failed to create role');
            }
        }
    }
    function cancel() {
        router.push({ name: 'roles.list' });
    }
    return { roles, form, errors, getError, clearError, hasError, rules: roleRules, groupedPermissions, submit, cancel };
}
