export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export function notify(severity: ToastSeverity, summary: string, detail?: string) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { severity, summary, detail, life: 3500 } }))
}
