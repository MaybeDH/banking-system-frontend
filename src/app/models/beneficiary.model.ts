import { User } from './user.model';
import { Account } from './account.model';

export interface Beneficiary {
  beneficiaryId?: number;
  user: User;
  account: Account;
  // addUser?: string;
  // changeUser?: string;
}
