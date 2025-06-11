import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  constructor() { }

  getALlUsers() :Observable<any> {
    return this.http.get<any[]>(`http://localhost:8080/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/${id}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/email/${email}`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/users', user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/users/${id}`);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(`http://localhost:8080/users/${user.id}`, user);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/users/login`, { email, password });
  }
  /*login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }*/


}
