export interface Currency {
  text: string;
  value: string;
}

export type CurrencyValue = 'USD' | 'COP';

export const currencies: Currency[] = [
  { text: 'USD', value: 'USD' },
  { text: 'COP', value: 'COP' },
];
