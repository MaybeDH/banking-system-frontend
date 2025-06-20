import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, CommonModule} from '@angular/common';
import {AccountService} from '../../core/services/account/account.service';
import {Router} from '@angular/router';
import {Account} from '../../models/account.model';
import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    DatePipe,
    CommonModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements  OnInit {
  accounts: Account[] = [];
  depositForm!: FormGroup;
  withdrawalForm!: FormGroup;
  transferForm!: FormGroup;
  transactions: Transaction[] = [];
  filterDate: string = '';
  filterWeek: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getAccount().subscribe(accounts => {
      this.accounts = accounts;
    });

    this.depositForm = this.fb.group({
      accountId: [''],
      amount: [0],
      description: ['']
    });

    this.withdrawalForm = this.fb.group({
      accountId: [''],
      amount: [0],
      description: ['']
    });

    this.transferForm = this.fb.group({
      sourceAccountId: [''],
      targetAccountId: [''],
      amount: [0],
      description: ['']
    });

    this.transactionService.getTransaction().subscribe(transaction => {
      this.transactions = transaction;
    })
  }

  // DEPÓSITO
  submitDeposit() {
    const form = this.depositForm.value;
    const transaction = {
      sourceAccountId: +form.accountId,
      transactionType: 'Depósito',
      amount: +form.amount
    };
    console.log("esta es la transaction",transaction);
    this.transactionService.createTransaction(transaction).subscribe(() => {
      alert('Depósito procesado');
      this.router.navigate(['/operator/transactions']);
    });
  }

  // RETIRO
  submitWithdrawal() {
    const form = this.withdrawalForm.value;
    const transaction = {
      sourceAccountId: +form.accountId,
      transactionType: 'Retiro',
      amount: +form.amount
    };
    console.log("esta es la transaction",transaction);

    this.transactionService.createTransaction(transaction).subscribe(() => {
      alert('Retiro procesado');
      this.router.navigate(['/operator/transactions']);
    });
  }

  // TRANSFERENCIA
  submitTransfer() {
    const form = this.transferForm.value;
    const transaction = {
      sourceAccountId: +form.sourceAccountId,
      targetAccountId: +form.targetAccountId,
      transactionType: 'Transferencia',
      amount: +form.amount
    };
    console.log("esta es la transaction",transaction);

    this.transactionService.createTransaction(transaction).subscribe(() => {
      alert('Transferencia procesada');
      this.router.navigate(['/operator/transactions']);
    });
  }
  get transactionsSorted() {
    let filtered = [...this.transactions];
    if (this.filterDate) {
      filtered = filtered.filter(t => {
        if (!t.date) return false;
        const d = new Date(t.date);
        const yyyy = d.getFullYear();
        const mm = (d.getMonth() + 1).toString().padStart(2, '0');
        const dd = d.getDate().toString().padStart(2, '0');
        return `${yyyy}-${mm}-${dd}` === this.filterDate;
      });
    } else if (this.filterWeek) {
      // Filtrar por semana (YYYY-Www)
      filtered = filtered.filter(t => {
        if (!t.date) return false;
        const d = new Date(t.date);
        const year = d.getFullYear();
        const week = this.getWeekNumber(d);
        return `${year}-W${week}` === this.filterWeek;
      });
    }
    return filtered.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }

  getWeekNumber(date: Date): string {
    // ISO week number
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    return weekNum.toString().padStart(2, '0');
  }

  viewTransaction(transaction: Transaction) {
    alert('Detalle de transacción:\n' + JSON.stringify(transaction, null, 2));
  }

  copyTransaction(transaction: Transaction) {
    const text = `Tipo: ${transaction.transactionType}\nCuenta Origen: ${transaction.sourceAccount.accountNumber}\nCuenta Destino: ${transaction.targetAccount?.accountNumber || '-'}\nMonto: ${transaction.amount}\nFecha: ${transaction.date}`;
    navigator.clipboard.writeText(text);
    alert('Transacción copiada al portapapeles');
  }
}
