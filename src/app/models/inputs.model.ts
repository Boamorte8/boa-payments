export interface GeneralObject {
  [key: string]: string | number;
}

export interface SelectType {
  [key: string]: string;
}

export interface BaseSelectItem {
  text: string;
  value: string;
}

export interface BaseItem {
  id: string;
  name: string;
}
