export interface Rol {
  rolId?: number;
  name: 'Cliente' | 'Operador' | 'Admin';
  description?: string;
}
