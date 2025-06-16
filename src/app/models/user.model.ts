import { Profile } from './profile.model';
import {Rol} from './rol.model';
import {Account} from './account.model';

export interface User {
  id?: number;
  email: string;
  password?: string;
  addDate?: Date;
  addUser?: string;
  changeDate?: Date;
  changeUser?: string;
  deleted?: boolean;
  profile?: Profile;
  accounts?: Account[];
  rol?: Rol;
}
