// services/account.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AccountRequest {
  currencyType: string;
  balance: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/Accounts';

  constructor(private http: HttpClient) {}

  createAccount(accountData: AccountRequest): Observable<any> {
    return this.http.post(this.apiUrl, accountData);
  }
}
