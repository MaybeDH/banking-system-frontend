import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransferComponent} from './transfer/transfer.component';
import {BeneficiariesComponent} from './beneficiaries/beneficiaries.component';
import {NewBeneficiaryComponent} from './beneficiaries/new-beneficiary/new-beneficiary.component';
import {AccountDetailComponent} from './accounts/account-detail/account-detail.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/accountDetail/:id', component: AccountDetailComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'beneficiaries', component: BeneficiariesComponent },
  { path: 'beneficiaries/new', component: NewBeneficiaryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {

}
