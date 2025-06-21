import { Component, OnInit } from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountService} from '../../core/services/account/account.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-accounts',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  totalBalance: number = 0;
  constructor(
    private accountService: AccountService,
    private auth: AuthService,
  ) { }
  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    console.log(userId);
    if (userId) {
      this.accountService.getAccountsByUserId(userId).subscribe(response => {
        this.accounts = response.accounts;
        this.totalBalance = response.totalBalance;
      });
    }
  }
  get activeAccounts(): Account[] {
    return this.accounts?.filter(account => account.status === 'Activa') || [];
  }
}
