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
  createAccount(account: any) :Observable<any> {
      return this.http.post<any>(this.apiUrl, account);
  }
  updateAccount(id: number, account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, account);
  }
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateBalanceAccount(id: number, payload: { balance: number }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/balance`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  getAccountsByUserId(userId: number): Observable<{ accounts: Account[], totalBalance: number }> {
    return this.http.get<{ accounts: Account[], totalBalance: number }>(
      `${this.apiUrl}/user/${userId}`);
  }

}
