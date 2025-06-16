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


  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'operator',
    loadChildren: () =>
      import('./operator/operator.module').then(m => m.OperatorModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'auth/login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'auth/login'
  // }


];
