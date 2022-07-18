export interface Category {
  id: string;
  name: string;
  userId: string;
}

export interface CategoryState {
  categories: Category[];
  loaded: boolean;
  loading: boolean;
  openModal: boolean;
  saving: boolean;
}
