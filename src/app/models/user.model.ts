export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  criadoEm: Date;
}

export class User implements IUser {
  constructor(
    public id: string,
    public nome: string,
    public email: string,
    public senha: string,
    public role: UserRole,
    public criadoEm: Date = new Date()
  ) {}
}