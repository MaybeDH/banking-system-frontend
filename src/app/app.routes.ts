import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',loadComponent:()=>import('./login-form/login-form.component')
  },
  {
    path: 'user-list', loadComponent:()=> import ('./user-list/user-list.component')
  },

  {
    path: 'user-list/new', loadComponent:()=> import ('./new-user/new-user.component')
  },
  {
    path: 'user-list/view-user/:id', loadComponent:()=> import ('./view-user/view-user.component')
  },
  {
    path: 'user-list/edit-user/:id', loadComponent:()=> import ('./user-form/user-form.component')
  },
  {
    path: 'user-list/new-account/:userId', loadComponent:()=> import ('./account-form/account-form.component')
  },

];
