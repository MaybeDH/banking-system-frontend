import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
interface Account {
  id: string
  accountNumber: string
  userId: string
  userName: string
  type: 'savings' | 'checking'
  currency: string
  balance: number
  status: 'active' | 'inactive'
  createdAt: string
}
@Component({
  selector: 'app-accounts',
  imports: [
    FormsModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  user = { role: 'admin' } // Simulación: deberías inyectar AuthService
  searchTerm = ''
  accounts: Account[] = [
    {
      id: '1',
      accountNumber: '1234-5678-9012-3456',
      userId: '1',
      userName: 'Juan Pérez',
      type: 'savings',
      currency: 'USD',
      balance: 15450.0,
      status: 'active',
      createdAt: '2023-10-15',
    },
    {
      id: '2',
      accountNumber: '2345-6789-0123-4567',
      userId: '1',
      userName: 'Juan Pérez',
      type: 'checking',
      currency: 'USD',
      balance: 8230.5,
      status: 'active',
      createdAt: '2023-11-02',
    },
    {
      id: '3',
      accountNumber: '3456-7890-1234-5678',
      userId: '2',
      userName: 'María García',
      type: 'savings',
      currency: 'EUR',
      balance: 12500.75,
      status: 'active',
      createdAt: '2023-09-20',
    },
    {
      id: '4',
      accountNumber: '4567-8901-2345-6789',
      userId: '3',
      userName: 'Carlos López',
      type: 'checking',
      currency: 'USD',
      balance: 3200.25,
      status: 'inactive',
      createdAt: '2023-08-05',
    },
    {
      id: '5',
      accountNumber: '5678-9012-3456-7890',
      userId: '4',
      userName: 'Ana Martínez',
      type: 'savings',
      currency: 'USD',
      balance: 7800.0,
      status: 'active',
      createdAt: '2023-07-12',
    },
  ]

  get filteredAccounts(): Account[] {
    return this.accounts.filter((a) =>
      a.accountNumber.includes(this.searchTerm) ||
      a.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  getAccountTypeBadge(type: string): string {
    switch (type) {
      case 'savings':
        return 'Ahorros'
      case 'checking':
        return 'Corriente'
      default:
        return 'Desconocido'
    }
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'active':
        return 'Activa'
      case 'inactive':
        return 'Inactiva'
      default:
        return 'Desconocido'
    }
  }
}
