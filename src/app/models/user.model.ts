import { Profile } from './profile.model';
import {Rol} from './rol.model';

export interface User {
  userId?: number;
  email: string;
  password?: string;
  addDate?: Date;
  addUser?: string;
  changeDate?: Date;
  changeUser?: string;
  deleted?: boolean;
  profile?: Profile;
  rol?: Rol;
}
