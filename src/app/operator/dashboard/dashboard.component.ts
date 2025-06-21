import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';
import {TransactionService} from '../../core/services/transaction/transaction.service';
import {Transaction} from '../../models/transaction.model';
import { User } from '../../models/user.model';
import {UserService} from '../../core/services/user/user.service';
import {BeneficiaryService} from '../../core/services/beneficiary/beneficiary.service';
import {Beneficiary} from '../../models/beneficiary.model';
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, DatePipe, CommonModule} from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    DatePipe,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit {
  user: User | null=null;
  transactions: Transaction[] = [];
  beneficiaries: Beneficiary[] = [];
  transferencias: Transaction[] = [];
  depositos: Transaction[] = [];
  retiros: Transaction[] = [];
  resumen = {
    transferencias: { cantidad: 0, total: 0 },
    depositos: { cantidad: 0, total: 0 },
    retiros: { cantidad: 0, total: 0 }
  };
  totalBeneficiarios: number = 0;

  constructor(private router: Router,
              private auth: AuthService,
              private transactionService: TransactionService,
              private userService: UserService,
              private beneficiaryService: BeneficiaryService,) {}


  ngOnInit(): void {

    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.id;


    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        console.log('User', data);
      })
    }
    this.transactionService.getTransaction().subscribe(data => {
      this.transactions = data;
      this.separarTransacciones();
      this.calcularResumen();
    })
    this.beneficiaryService.getAll().subscribe(data => {
      this.beneficiaries = data;
      this.totalBeneficiarios = data.length;
    })

  }

  separarTransacciones() {
    this.transferencias = this.transactions.filter(t => t.transactionType.toLowerCase() === 'transferencia');
    this.depositos = this.transactions.filter(t => t.transactionType.toLowerCase() === 'depósito' || t.transactionType.toLowerCase() === 'deposito');
    this.retiros = this.transactions.filter(t => t.transactionType.toLowerCase() === 'retiro');
  }

  calcularResumen() {
    this.resumen.transferencias.cantidad = this.transferencias.length;
    this.resumen.transferencias.total = this.transferencias.reduce((sum, t) => sum + t.amount, 0);
    this.resumen.depositos.cantidad = this.depositos.length;
    this.resumen.depositos.total = this.depositos.reduce((sum, t) => sum + t.amount, 0);
    this.resumen.retiros.cantidad = this.retiros.length;
    this.resumen.retiros.total = this.retiros.reduce((sum, t) => sum + t.amount, 0);
  }

  get transactionsSorted() {
    return [...this.transactions].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }
}
