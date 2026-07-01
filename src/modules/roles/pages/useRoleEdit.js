import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormErrors } from '@/composables/useFormErrors';
import { usePermissionStore } from '@/modules/permissions/store';
import { useRoleStore } from '@/modules/roles/store';
import { mapBackendErrorsToForm } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
import { roleRules } from '@/validations/role.rules';
export function useEdit() {
    const route = useRoute();
    const router = useRouter();
    const roles = useRoleStore();
    const permissions = usePermissionStore();
    const { errors, setErrors, clearErrors, clearError, getError, hasError } = useFormErrors();
    const form = reactive({ name: '', permissions: [] });
    const id = String(route.params.id);
    const groupedPermissions = computed(() => permissions.grouped);
    onMounted(async () => {
        await Promise.all([permissions.fetchPermissions(), roles.fetchRole(id)]);
        Object.assign(form, roles.current || {});
    });
    async function submit(formRef) {
        clearErrors();
        if (!(await formRef?.validate().catch(() => false)))
            return;
        try {
            await roles.updateRole(id, form);
            router.push({ name: 'roles.detail', params: { id } });
        }
        catch (error) {
            if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
                notifyError('Failed to update role');
            }
        }
    }
    function cancel() {
        router.push({ name: 'roles.detail', params: { id } });
    }
    return { roles, form, errors, getError, clearError, hasError, rules: roleRules, groupedPermissions, submit, cancel };
}
