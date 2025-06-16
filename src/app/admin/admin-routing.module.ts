import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import UserListComponent from '../user-list/user-list.component';
import NewUserComponent from '../new-user/new-user.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {AccountsComponent} from './accounts/accounts.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'users', component: UserListComponent},
  { path: 'users/new', component: NewUserComponent },
  { path: 'users/:id/edit', component: EditUserComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
