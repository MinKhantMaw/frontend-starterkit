import { useToast } from 'primevue/usetoast';
let toastApi = null;

function pushToast(severity, detail, summary, life = 3000) {
    if (!toastApi) return;
    toastApi.add({ severity, summary, detail, life });
}

export function useNotifier() {
    toastApi = useToast();
    return {
        success: notifySuccess,
        error: notifyError,
        warning: notifyWarning,
        info: notifyInfo,
    };
}
export function notifySuccess(detail, summary = 'Success') {
    pushToast('success', detail, summary);
}
export function notifyError(detail, summary = 'Error') {
    pushToast('error', detail, summary, 5000);
}
export function notifyWarning(detail, summary = 'Warning') {
    pushToast('warn', detail, summary);
}
export function notifyInfo(detail, summary = 'Info') {
    pushToast('info', detail, summary);
}
export const notify = {
    success: notifySuccess,
    error: notifyError,
    warning: notifyWarning,
    info: notifyInfo,
};
