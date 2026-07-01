import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormErrors } from '@/composables/useFormErrors';
import { useAuthStore } from '@/modules/auth/store';
import { getApiErrorMessage, mapBackendErrorsToForm } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
import { loginRules } from '@/validations/auth.rules';
export function useLogin() {
    const route = useRoute();
    const router = useRouter();
    const auth = useAuthStore();
    const { errors, setErrors, clearErrors, getError, hasError } = useFormErrors();
    const form = reactive({
        email: '',
        password: '',
        remember: false,
    });
    async function submit(formRef) {
        if (auth.loading)
            return;
        clearErrors();
        if (!(await formRef?.validate().catch(() => false)))
            return;
        try {
            const result = await auth.login(form);
            if (result?.requiresTwoFactor) {
                router.push({ name: 'two-factor-challenge' });
                return;
            }
            router.push(route.query.redirect ? String(route.query.redirect) : { name: 'dashboard' });
        }
        catch (error) {
            if (!mapBackendErrorsToForm(error, formRef, setErrors)) {
                const status = error.response?.status;
                const fallback = status === 429
                    ? 'Too many login attempts. Please wait a minute and try again.'
                    : status === 403
                        ? 'Your account is inactive. Please contact administrator.'
                        : 'Invalid email or password';
                notifyError(getApiErrorMessage(error, fallback));
            }
        }
    }
    return { auth, form, errors, getError, hasError, rules: loginRules, submit };
}
