import { ElMessageBox } from 'element-plus'

export interface ConfirmDialogProps {
  title: string
  message: string
  confirmText: string
  type: 'warning' | 'error' | 'info' | 'success'
}

export function useConfirmDialog(props: ConfirmDialogProps, onConfirm: () => void) {
  async function open() {
    await ElMessageBox.confirm(props.message, props.title, {
      confirmButtonText: props.confirmText,
      cancelButtonText: 'Cancel',
      type: props.type,
    })
    onConfirm()
  }

  return { open }
}
