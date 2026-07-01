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
        notifyError(firstMessage, 'Validation error');
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
        notifyError(getApiErrorMessage(error, 'You do not have permission to perform this action.'), 'Forbidden');
        return;
    }
    if (status === 429) {
        notifyError(getApiErrorMessage(error, 'Too many requests. Please wait and try again.'), 'Rate limit exceeded');
        return;
    }
    if (status === 404) {
        notifyError(getApiErrorMessage(error, 'The requested resource was not found.'));
        return;
    }
    if (status === 422) {
        return;
    }
    if (status >= 500) {
        notifyError(getApiErrorMessage(error, 'Something went wrong on the server.'));
        return;
    }
    notifyError(getApiErrorMessage(error));
}
