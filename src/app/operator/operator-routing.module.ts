import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {AdjustSaldoComponent} from './adjust-saldo/adjust-saldo.component';
import {AccountsComponent} from './accounts/accounts.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'adjust-saldo', component: AdjustSaldoComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
