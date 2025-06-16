import { Injectable } from '@angular/core';
import {User} from '../../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  private userLoggedIn: User | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        this.userLoggedIn = user;
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.userLoggedIn = null;
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (this.userLoggedIn) return this.userLoggedIn;

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userLoggedIn = JSON.parse(savedUser);
      return this.userLoggedIn;
    }

    return null;
  }

  getUserRole(): string | null {
    return this.getCurrentUser()?.rol?.name || null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
