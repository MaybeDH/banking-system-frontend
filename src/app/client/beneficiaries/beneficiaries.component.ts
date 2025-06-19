import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Beneficiary} from '../../models/beneficiary.model';
import {AuthService} from '../../core/services/auth/auth.service';
import {BeneficiaryService} from '../../core/services/beneficiary/beneficiary.service';
import {Account} from '../../models/account.model';
import {AccountService} from '../../core/services/account/account.service';

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

export class BeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  clientAccounts: Account[] = []; // cuentas propias
  accountIdToAdd: number | null = null;
  searchTerm = '';
  userId: number | undefined;
  errorMessage = '';

  constructor(
    private beneficiaryService: BeneficiaryService,
    private auth: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    this.userId = user?.id;

    if (this.userId) {
      this.loadBeneficiaries();
      this.loadMyAccounts();
    }
  }
  filteredBeneficiaries() {
    const term = this.searchTerm.toLowerCase();
    return this.beneficiaries.filter(b =>
      b.user.profile?.name.toLowerCase().includes(term) ||
      b.user.email.toLowerCase().includes(term) ||
      b.account.accountNumber.includes(term)
    );
  }
  loadBeneficiaries(): void {
    this.beneficiaryService.getByUserId(this.userId!).subscribe(data => {
      this.beneficiaries = data;
      console.log("beneficiary",this.beneficiaries);
    });
  }

  loadMyAccounts(): void {
    this.accountService.getAccountsByUserId(this.userId!).subscribe(accounts => {
      this.clientAccounts = accounts.accounts;
    });
  }

  addBeneficiary(): void {
    this.errorMessage = '';

    if (!this.accountIdToAdd || this.accountIdToAdd <= 0) {
      this.errorMessage = 'Debes ingresar un ID de cuenta válido.';
      return;
    }

    const isOwnAccount = this.clientAccounts.some(acc => acc.accountId === this.accountIdToAdd);
    if (isOwnAccount) {
      this.errorMessage = 'No puedes agregarte a ti mismo como beneficiario.';
      return;
    }

    const request = {
      userId: this.userId!,
      accountId: this.accountIdToAdd
    };

    this.beneficiaryService.create(request).subscribe({
      next: () => {
        this.accountIdToAdd = null;
        this.loadBeneficiaries();
      },
      error: () => {
        this.errorMessage = 'No se pudo agregar el beneficiario. Verifica el ID.';
      }
    });
  }

  deleteBeneficiary(id: number): void {
    this.beneficiaryService.deleteBeneficiary(id).subscribe(() => {
      this.beneficiaries = this.beneficiaries.filter(b => b.beneficiaryId !== id);
    });
  }
}
