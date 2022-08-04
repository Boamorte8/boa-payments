export interface Currency {
  id: string;
  text: string;
  value: string;
  userId: string;
}

export type CurrencyValue = 'USD' | 'COP';

export const currencies: Currency[] = [
  { id: '0000', text: 'USD', value: 'USD', userId: '' },
  { id: '0001', text: 'COP', value: 'COP', userId: '' },
];

export interface CurrencyState {
  currencies: Currency[];
  extraCurrencies: Currency[];
  loaded: boolean;
  loading: boolean;
  openModal: boolean;
  saving: boolean;
}
