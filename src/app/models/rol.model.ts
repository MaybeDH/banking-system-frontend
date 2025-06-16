export interface User {
  id?: number;
  email: string;
  password: string;
  profile?: Profile;
  rol?: string;
}
