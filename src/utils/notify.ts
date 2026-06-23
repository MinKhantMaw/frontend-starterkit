import { useToast } from 'primevue/usetoast'

type ToastApi = ReturnType<typeof useToast>

let toastApi: ToastApi | null = null

export function useNotifier() {
  toastApi = useToast()
  return {
    success: notifySuccess,
    error: notifyError,
    info: notifyInfo,
  }
}

export function notifySuccess(detail: string, summary = 'Success'): void {
  toastApi?.add({ severity: 'success', summary, detail, life: 3000 })
}

export function notifyError(detail: string, summary = 'Error'): void {
  toastApi?.add({ severity: 'error', summary, detail, life: 5000 })
}

export function notifyInfo(detail: string, summary = 'Info'): void {
  toastApi?.add({ severity: 'info', summary, detail, life: 3000 })
}
