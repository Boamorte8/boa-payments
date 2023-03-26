import { CurrencyValue } from './currency.model';

export interface SummaryData {
  currency: CurrencyValue;
  totalAmountLoan: number;
  totalCurrentAmountLoan: number;
  totalAmountDebt: number;
  totalCurrentAmountDebt: number;
}
