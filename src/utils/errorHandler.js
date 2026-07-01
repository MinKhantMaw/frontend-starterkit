import { ElMessage } from 'element-plus';
import { tokenStorage } from '@/api/tokenStorage';
import { notifyError } from '@/utils/notify';
export function registerGlobalErrorHandler(app) {
    app.config.errorHandler = (error) => {
        console.error(error);
        notifyError(error instanceof Error ? error.message : 'Unexpected application error');
    };
}
export function isValidationError(error) {
    const axiosError = error;
    return axiosError.response?.status === 422 && Boolean(axiosError.response.data?.errors);
}
export function getApiErrorMessage(error, fallback = 'Request failed') {
    const axiosError = error;
    return axiosError.response?.data?.message || axiosError.message || fallback;
}
export function mapBackendErrorsToForm(error, formRef, setErrors) {
    if (!isValidationError(error))
        return false;
    const errors = error.response?.data?.errors || {};
    setErrors?.(errors);
    Object.keys(errors).forEach((field) => {
        formRef?.validateField(field).catch(() => undefined);
    });
    const firstMessage = Object.values(errors)[0]?.[0];
    if (firstMessage)
        ElMessage.error(firstMessage);
    return true;
}
export function handleApiError(error, router) {
    const axiosError = error;
    const status = axiosError.response?.status;
    if (status === 401) {
        tokenStorage.clear();
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        router?.push({ name: 'login' });
        return;
    }
    if (status === 403) {
        router?.push({ name: 'forbidden' });
        return;
    }
    if (status !== 422) {
        ElMessage.error(getApiErrorMessage(error));
    }
}
