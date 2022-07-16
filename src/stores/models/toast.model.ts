export enum TypeToast {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEFAULT = 'default',
}

export interface Toast {
  id: number;
  title: string;
  type: TypeToast;
  message: string;
  stopAutoDismiss?: boolean;
}

export interface ToastState {
  toasts: Toast[];
}
