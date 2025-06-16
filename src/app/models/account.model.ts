export interface Profile {
  id?: number;
  name: string;
  lastName: string;
  gender?: string;
  birthday?: Date;
  ci: string;
  mobile: string;
  address: string;
  status: 'Activo' | 'Inactivo';
}
