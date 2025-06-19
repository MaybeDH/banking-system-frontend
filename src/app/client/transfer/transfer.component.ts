import {Component, OnInit} from '@angular/core';
import {Beneficiary} from '../../models/beneficiary.model';
import {Account} from '../../models/account.model';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {AccountService} from '../../core/services/account/account.service';
import {BeneficiaryService} from '../../core/services/beneficiary/beneficiary.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {Transaction} from '../../models/transaction.model';
import {TransactionRequest} from '../../models/transaction-request.model';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-transfer',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements  OnInit {
  userId:number |undefined;
  accounts: Account[] = [];
  beneficiaries: Beneficiary[] = [];

  sourceAccountId: number | null = null;
  targetAccountId: number | null = null;
  amount: number = 0;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.userId = this.auth.getCurrentUser()?.id;

    if (this.userId) {
      this.accountService.getAccountsByUserId(this.userId).subscribe(data => {
        this.accounts = data.accounts;
      });

      this.beneficiaryService.getByUserId(this.userId).subscribe(data => {
        this.beneficiaries = data;
      });
    }
  }
  submit(): void {
    this.clearMessages();

    console.log(this.accounts)
    const source = this.accounts.find(acc => acc.accountId == this.sourceAccountId);
    const target = this.beneficiaries.find(b => b.account.accountId == this.targetAccountId)?.account;

    if (!source || !target || !this.amount) {
      this.errorMessage = 'Completa todos los campos.';
      return;
    }

    if (source.accountId === target.accountId) {
      this.errorMessage = 'No puedes transferir a tu misma cuenta.';
      return;
    }

    if (this.amount <= 0) {
      this.errorMessage = 'El monto debe ser mayor a cero.';
      return;
    }

    if (this.amount > source.balance) {
      this.errorMessage = 'No tienes suficiente saldo.';
      return;
    }

    const transaction = {
      sourceAccountId: source.accountId,
      targetAccountId: target.accountId,
      transactionType: 'Transferencia',
      amount: this.amount
    };
    console.log("Sending transaction", transaction);
    this.transactionService.createTransaction(transaction).subscribe({
      next: () => {
        this.successMessage = 'Transferencia realizada con éxito.';
        this.amount = 0;
        this.targetAccountId = null;
        this.sourceAccountId = null;
      },
      error: () => {
        this.errorMessage = 'Hubo un error al realizar la transferencia.';
      }
    });
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
