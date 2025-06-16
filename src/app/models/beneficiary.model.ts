import { User } from './user.model';
import { Account } from './account.model';

export interface Beneficiary {
  beneficiaryId?: number;
  user: User;
  account: Account;
  addDate?: Date;
  addUser?: string;
  changeDate?: Date;
  changeUser?: string;
  deleted?: boolean;
}
