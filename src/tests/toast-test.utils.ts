import { type Toast, TypeToast } from '../stores/models';

export const mockToasts: Toast[] = [
  {
    id: 12340,
    title: 'Test Toast 0',
    type: TypeToast.DEFAULT,
    message: 'Test message toast 0',
  },
  {
    id: 12341,
    title: 'Test Toast 1',
    type: TypeToast.DEFAULT,
    message: 'Test message toast 1',
  },
  {
    id: 12342,
    title: 'Test Toast 2',
    type: TypeToast.DEFAULT,
    message: 'Test message toast 2',
  },
  {
    id: 12343,
    title: 'Test Toast 3',
    type: TypeToast.DEFAULT,
    message: 'Test message toast 3',
  },
];
