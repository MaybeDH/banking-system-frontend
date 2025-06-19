export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  gender: string;
  birthday: Date | undefined;
  ci: string;
  mobile: string;
  address: string;
  status: 'Activo' | 'Inactivo';
  rolId: number;
}
