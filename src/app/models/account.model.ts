import { User } from './user.model';

export interface Account {
  accountId?: number;
  accountNumber: string;
  currency: 'Bs' | 'Dolares';
  type: 'Ahorros' | 'Corriente';
  balance: number;
  status: 'Activa' | 'Inactiva' | 'Cerrada';
  addDate?: Date;
  addUser?: string;
  changeDate?: Date;
  changeUser?: string;
  deleted?: boolean;
  userId?: number;
  user?: User;
}
