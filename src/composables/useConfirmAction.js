import { useConfirm } from 'primevue/useconfirm'

export function useConfirmAction() {
  const confirm = useConfirm()

  function confirmAction({
    message,
    header = 'Confirm action',
    icon = 'pi pi-exclamation-triangle',
    acceptLabel = 'Confirm',
    rejectLabel = 'Cancel',
    acceptClass = '',
    onAccept,
  }) {
    confirm.require({
      message,
      header,
      icon,
      acceptLabel,
      rejectLabel,
      acceptClass,
      accept: onAccept,
    })
  }

  function confirmDelete({ name = 'this record', onAccept }) {
    confirmAction({
      message: `Delete ${name}?`,
      header: 'Delete record',
      acceptLabel: 'Delete',
      acceptClass: 'p-button-danger',
      onAccept,
    })
  }

  return { confirmAction, confirmDelete }
}
