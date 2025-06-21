import { Account } from './account.model';

export interface Transaction {
  transactionId?: number;
  sourceAccount: Account;
  targetAccount: Account;
  transactionType: 'Retiro' | 'Depósito' | 'Transferencia';
  amount: number;
  date?: Date;
}
