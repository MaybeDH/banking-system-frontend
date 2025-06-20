import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Beneficiary} from '../../models/beneficiary.model';
import {Account} from '../../models/account.model';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {AccountService} from '../../core/services/account/account.service';
import {BeneficiaryService} from '../../core/services/beneficiary/beneficiary.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {Transaction} from '../../models/transaction.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfer',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements  OnInit {
  userId:number |undefined;
  accounts: any[] = [];
  transactions: any[] = [];
  beneficiaries: any[] = [];

  sourceAccountId: number | null = null;
  targetAccountId: number | null = null;
  amount: number = 0;

  selectedAccountForHistory: number | null = null;


  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.userId = this.auth.getCurrentUser()?.id;
    // Leer el parámetro de la URL
    this.route.queryParams.subscribe(params => {
      const targetId = params['targetAccountId'];
      if (targetId) {
        this.targetAccountId = +targetId;
      }
    });
    if (this.userId) {
      this.accountService.getAccountsByUserId(this.userId).subscribe(data => {
        this.accounts = data.accounts;
        console.log(data.accounts);
      });

      this.beneficiaryService.getByUserId(this.userId).subscribe(data => {
        // Filtrar solo beneficiarios válidos
        this.beneficiaries = (data as BeneficiaryWithDeleted[]).filter(b => b.account && !b.deleted);
        // Si ya hay un parámetro, forzar la selección
        if (this.targetAccountId) {
          const exists = this.beneficiaries.some(b => b.account.accountId == this.targetAccountId);
          if (!exists) this.targetAccountId = null;
        }
        this.cdr.detectChanges();
      });

    }
  }
  loadTransactionHistory(accountId: number): void {
    if (!accountId) return;

    this.transactionService.getTransactionsByAccountId(accountId).subscribe({
      next: (data) => {
        console.log("Transacciones cargadas:",data);

        this.transactions = data;
      },
      error: (err) => {
        console.error("Error al cargar el historial de transacciones", err);
        this.transactions = [];
      }
    });
  }

  submit(): void {

    console.log(this.accounts)
    const source = this.accounts.find(acc => acc.accountId == this.sourceAccountId);
    const target = this.beneficiaries.find(b => b.account.accountId == this.targetAccountId)?.account;

    if (!source || !target || !this.amount) {
      return;
    }

    if (source.accountId === target.accountId) {
      return;
    }

    if (this.amount <= 0) {
      return;
    }

    if (this.amount > source.balance) {
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
        this.amount = 0;
        this.targetAccountId = null;
        this.sourceAccountId = null;
      },
      error: () => {
      }
    });
  }
}

// Extiende la interfaz para permitir 'deleted' (workaround rápido)
interface BeneficiaryWithDeleted extends Beneficiary {
  deleted?: boolean;
}
