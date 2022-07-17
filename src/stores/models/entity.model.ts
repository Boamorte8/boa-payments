export interface Entity {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export interface EntityState {
  entities: Entity[];
  loaded: boolean;
  loading: boolean;
  openModal: boolean;
  saving: boolean;
}
