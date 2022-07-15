export interface Entity {
  id: string;
  name: string;
  description: string;
}

export interface EntityState {
  entities: Entity[];
  loaded: boolean;
  loading: boolean;
}
