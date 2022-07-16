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
}

export interface ToastState {
  toasts: Toast[];
}
