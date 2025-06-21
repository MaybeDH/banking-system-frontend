import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account/account.service';
import { BeneficiaryService } from '../../../core/services/beneficiary/beneficiary.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Account } from '../../../models/account.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-beneficiary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-beneficiary.component.html',
  styleUrl: './new-beneficiary.component.css'
})
export class NewBeneficiaryComponent implements OnInit {
  beneficiaryForm: FormGroup;
  accounts: Account[] = [];
  error: string = '';
  success: string = '';
  alias: string='';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.beneficiaryForm = this.fb.group({
      alias:['', Validators.required],
      accountNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    if (this.beneficiaryForm.invalid) return;
    const accountNumber = this.beneficiaryForm.value.accountNumber;
    const account = this.accounts.find(acc => acc.accountNumber == accountNumber);
    if (!account || account.accountId === undefined) {
      this.error = 'No se encontró una cuenta válida con ese número.';
      return;
    }
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      this.error = 'Usuario no autenticado.';
      return;
    }
    if(account.accountId == userId){
      this.error = 'No puedes agregar tu propia cuenta como beneficiario.';
      return;
    }
    const alias = this.beneficiaryForm.value.alias;
    const payload = { alias, userId, accountId: account.accountId };
    this.beneficiaryService.create(payload).subscribe({
      next: () => {
        this.success = 'Beneficiario agregado correctamente';
        setTimeout(() => this.router.navigate(['/client/beneficiaries']), 1000);
      },
      error: () => {
        this.error = 'Error al agregar beneficiario';
      }
    });
  }
}
