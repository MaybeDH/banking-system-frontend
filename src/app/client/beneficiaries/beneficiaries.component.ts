import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-beneficiaries',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.css'
})
export class BeneficiariesComponent {
  searchTerm = '';

  beneficiaries = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      accountNumber: '123456789',
      bank: 'Banco Nacional'
    },
    {
      id: 2,
      name: 'Laura Gómez',
      email: 'laura.gomez@email.com',
      accountNumber: '987654321',
      bank: 'Banco del Sur'
    },
    {
      id: 3,
      name: 'Carlos Ramírez',
      email: 'carlos.ramirez@email.com',
      accountNumber: '456123789',
      bank: 'Banco Central'
    }
  ];

  filteredBeneficiaries() {
    const term = this.searchTerm.toLowerCase();
    return this.beneficiaries.filter(b =>
      b.name.toLowerCase().includes(term) ||
      b.email.toLowerCase().includes(term) ||
      b.accountNumber.includes(term) ||
      b.bank.toLowerCase().includes(term)
    );
  }

  deleteBeneficiary(id: number, name: string) {
    alert(`Eliminar beneficiario: ${name} (ID: ${id})`);
    this.beneficiaries = this.beneficiaries.filter(b => b.id !== id);
  }
}
