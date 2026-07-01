import { useToast } from 'primevue/usetoast';
let toastApi = null;
export function useNotifier() {
    toastApi = useToast();
    return {
        success: notifySuccess,
        error: notifyError,
        info: notifyInfo,
    };
}
export function notifySuccess(detail, summary = 'Success') {
    toastApi?.add({ severity: 'success', summary, detail, life: 3000 });
}
export function notifyError(detail, summary = 'Error') {
    toastApi?.add({ severity: 'error', summary, detail, life: 5000 });
}
export function notifyInfo(detail, summary = 'Info') {
    toastApi?.add({ severity: 'info', summary, detail, life: 3000 });
}
