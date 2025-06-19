import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {ProfileListComponent} from './profiles/profile-list/profile-list.component';
import {NewUserComponent} from './users/new-user/new-user.component';
import {ProfileComponent} from './users/user-list/profile/profile.component';
import {EditProfileComponent} from './profiles/edit-profile/edit-profile.component';
import {NewAccountComponent} from './accounts/new-account/new-account.component';
import {PerfilComponent} from './perfil/perfil.component';
import {EditPerfilComponent} from './perfil/edit-perfil/edit-perfil.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'users', component: UserListComponent},
  { path: 'users/new', component: NewUserComponent },
  { path: 'users/edit-user/:id', component: EditUserComponent },
  { path: 'users/perfil', component: ProfileComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/new', component: NewAccountComponent },
  { path: 'accounts/edit/:id', component: NewAccountComponent },
  { path: 'profiles' , component: ProfileListComponent},
  { path: 'profiles/edit/:profileId', component: EditProfileComponent },
  { path: 'perfil', component:PerfilComponent },
  {path: 'perfil/editPerfil', component: EditPerfilComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
