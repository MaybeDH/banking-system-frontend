import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../../models/account.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/accounts';
  constructor(private http: HttpClient) { }

  getAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}`);
  }
  getAccountById(id:number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }
  createAccount(account: Account) :Observable<Account> {
      return this.http.post<Account>(this.apiUrl, account);
  }
  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAccountsByUserId(userId: number): Observable<{ accounts: Account[], totalBalance: number }> {
    return this.http.get<{ accounts: Account[], totalBalance: number }>(
      `${this.apiUrl}/user/${userId}`);
  }

}
