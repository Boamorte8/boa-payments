import type { BaseItem } from '@app/models';

export interface Category extends BaseItem {
  userId: string;
}

export interface CategoryState {
  categories: Category[];
  loaded: boolean;
  loading: boolean;
  openModal: boolean;
  saving: boolean;
}
