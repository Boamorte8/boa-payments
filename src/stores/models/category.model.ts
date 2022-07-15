export interface Category {
  id: string;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loaded: boolean;
  loading: boolean;
}
