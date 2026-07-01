import { reactive } from 'vue';
export function useFormErrors() {
    const errors = reactive({});
    function setErrors(newErrors) {
        clearErrors();
        Object.entries(newErrors).forEach(([field, messages]) => {
            errors[field] = messages;
        });
    }
    function clearErrors() {
        Object.keys(errors).forEach((field) => {
            delete errors[field];
        });
    }
    function clearError(field) {
        delete errors[field];
    }
    function getError(field) {
        return errors[field]?.[0] || '';
    }
    function hasError(field) {
        return Boolean(getError(field));
    }
    return { errors, setErrors, clearErrors, clearError, getError, hasError };
}
