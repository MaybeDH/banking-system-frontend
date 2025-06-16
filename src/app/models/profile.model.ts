export interface Profile {
  profileId?: number;
  name: string;
  lastName: string;
  ci: string;
  mobile: string;
  address: string;
  status: 'Activo' | 'Inactivo';
  addDate?: Date;
  addUser?: string;
  changeDate?: Date;
  changeUser?: string;
  deleted?: boolean;
}
