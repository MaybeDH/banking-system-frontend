import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { User } from '../../models/user.model';
import { AccountService } from '../../core/services/account/account.service';
import {UserService} from '../../core/services/user/user.service';
import {Account} from '../../models/account.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements  OnInit {
  accounts: Account[]=[];
  users: User[]=[];
  // userId: string | null=null;
  // userMap: Map<number, User> = new Map(); // <userId, User>


  constructor(private accountService: AccountService,
  private userService: UserService) {
  }

  ngOnInit() {
    this.loadAccounts();
    // this.userService.getUsers().subscribe(users => {this.users = users});

  }
  loadAccounts(): void {
    this.accountService.getAccount().subscribe(accounts => {
      this.accounts=accounts;
      accounts.forEach(account => {

        this.userService.getUserById(Number(account.userId)).subscribe(user => {
          this.users.push(user); // Agregamos el usuario al array
        });
      });
    });

  }
  getUserName(userId: number): string {
    const user = this.users.find(u=>u.id===userId)
    return user ? `${user.profile?.name} ${user.profile?.lastName}` : 'Cargando...';
  }


  // user = { role: 'admin' } // Simulación: deberías inyectar AuthService
  // searchTerm = ''
  // accounts: Account[] = [
  //   {
  //     id: '1',
  //     accountNumber: '1234-5678-9012-3456',
  //     userId: '1',
  //     userName: 'Juan Pérez',
  //     type: 'savings',
  //     currency: 'USD',
  //     balance: 15450.0,
  //     status: 'active',
  //     createdAt: '2023-10-15',
  //   },
  //   {
  //     id: '2',
  //     accountNumber: '2345-6789-0123-4567',
  //     userId: '1',
  //     userName: 'Juan Pérez',
  //     type: 'checking',
  //     currency: 'USD',
  //     balance: 8230.5,
  //     status: 'active',
  //     createdAt: '2023-11-02',
  //   },
  //   {
  //     id: '3',
  //     accountNumber: '3456-7890-1234-5678',
  //     userId: '2',
  //     userName: 'María García',
  //     type: 'savings',
  //     currency: 'EUR',
  //     balance: 12500.75,
  //     status: 'active',
  //     createdAt: '2023-09-20',
  //   },
  //   {
  //     id: '4',
  //     accountNumber: '4567-8901-2345-6789',
  //     userId: '3',
  //     userName: 'Carlos López',
  //     type: 'checking',
  //     currency: 'USD',
  //     balance: 3200.25,
  //     status: 'inactive',
  //     createdAt: '2023-08-05',
  //   },
  //   {
  //     id: '5',
  //     accountNumber: '5678-9012-3456-7890',
  //     userId: '4',
  //     userName: 'Ana Martínez',
  //     type: 'savings',
  //     currency: 'USD',
  //     balance: 7800.0,
  //     status: 'active',
  //     createdAt: '2023-07-12',
  //   },
  // ]
  //
  // get filteredAccounts(): Account[] {
  //   return this.accounts.filter((a) =>
  //     a.accountNumber.includes(this.searchTerm) ||
  //     a.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   )
  // }
  //
  // getAccountTypeBadge(type: string): string {
  //   switch (type) {
  //     case 'savings':
  //       return 'Ahorros'
  //     case 'checking':
  //       return 'Corriente'
  //     default:
  //       return 'Desconocido'
  //   }
  // }
  //
  // getStatusBadge(status: string): string {
  //   switch (status) {
  //     case 'active':
  //       return 'Activa'
  //     case 'inactive':
  //       return 'Inactiva'
  //     default:
  //       return 'Desconocido'
  //   }
  // }
  protected readonly Number = Number;
}
