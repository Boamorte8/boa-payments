import type { BaseItem } from '@app/models';

export interface Entity extends BaseItem {
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
