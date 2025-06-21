import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { User } from '../../models/user.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // CORREGIDO
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  transactions: Transaction[] = [];
  resumen: TransactionSummary | null = null; // Para guardar el resumen

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.id;
    console.log(userId);

    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        console.log('User', data);
      });

      this.transactionService.getTransaction().subscribe(data => {
        this.transactions = data;
        console.log('Transactions', this.transactions);

        // ✅ Llamada correcta a resumen solo cuando los datos están listos
        this.resumen = summarizeTransactions(this.transactions);
        console.log('Resumen', this.resumen);
      });
    }
  }

  stats = [/* tus stats */];

  quickActions = [/* tus quickActions */];
}
interface Transactio {
  transactionType: string;
  amount: number;
}

interface TransactionSummary {
  depositoCount: number;
  depositoTotal: number;
  retiroCount: number;
  retiroTotal: number;
  transferenciaCount: number;
  transferenciaTotal: number;
}

function summarizeTransactions(transactions: Transaction[]): TransactionSummary {
  const summary: TransactionSummary = {
    depositoCount: 0,
    depositoTotal: 0,
    retiroCount: 0,
    retiroTotal: 0,
    transferenciaCount: 0,
    transferenciaTotal: 0
  };

  for (const tx of transactions) {
    const type = tx.transactionType.toLowerCase().trim();

    switch (type) {
      case 'depósito':
        summary.depositoCount++;
        summary.depositoTotal += tx.amount;
        break;
      case 'retiro':
        summary.retiroCount++;
        summary.retiroTotal += tx.amount;
        break;
      case 'transferencia':
        summary.transferenciaCount++;
        summary.transferenciaTotal += tx.amount;
        break;
    }
  }

  return summary;
}
