import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../models/account.model';
import {AccountService} from '../../core/services/account/account.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-adjust-saldo',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './adjust-saldo.component.html',
  styleUrl: './adjust-saldo.component.css'
})
export class AdjustSaldoComponent implements  OnInit {
  accounts: Account[] = [];
  selectedAccountId!: number;
  adjustmentType: string = '';
  amount: number = 0;

  constructor(  private accountService: AccountService) {}

  ngOnInit() {
    this.getAllAccounts();
    console.log(this.accounts);
  }

  getAllAccounts() {
    this.accountService.getAccount().subscribe(accounts => {
      this.accounts = accounts;
      console.log(this.accounts);
    });
  }

  onSubmit(form: any) {
    const selectedAccount = this.accounts.find(acc => acc.accountId == this.selectedAccountId);
    if (!selectedAccount) return;

    const currentBalance = selectedAccount.balance;
    const adjustment = this.adjustmentType === 'increase' ? this.amount : -this.amount;
    const newBalance = currentBalance + adjustment;

    const payload = { balance: newBalance };
    console.log( "entrad",payload);
    console.log(this.selectedAccountId);
    this.updateBalanceAccount(this.selectedAccountId, payload);
  }

  updateBalanceAccount(id: number, payload: { balance: number }) {
    console.log( "entrad",payload);
    console.log(id);
    this.accountService.updateBalanceAccount(id, payload).subscribe({
        next: res => alert('Saldo actualizado correctamente.'),
        error: err => alert('Error al actualizar el saldo.'),
    }

    );
  }
}
