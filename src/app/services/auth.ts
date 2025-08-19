import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private users: User[] = [
    new User('1', 'Admin', 'admin@outdoor.com', 'admin123', UserRole.ADMIN),
    new User('2', 'João Silva', 'user@outdoor.com', 'user123', UserRole.USER)
  ];

  constructor() {
    this.loadCurrentUser();
  }

  login(email: string, senha: string): boolean {
    const user = this.users.find(u => u.email === email && u.senha === senha);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === UserRole.ADMIN;
  }

  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUser = new User(user.id, user.nome, user.email, user.senha, user.role, new Date(user.criadoEm));
    }
  }
}