import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AccountService} from '../../core/services/account/account.service';
import {Router} from '@angular/router';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-transactions',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements  OnInit {
  accounts: Account[] = [];
  depositForm!: FormGroup;
  withdrawalForm!: FormGroup;
  transferForm!: FormGroup;

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
}
