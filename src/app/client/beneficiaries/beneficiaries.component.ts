import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf, DatePipe, CommonModule} from '@angular/common';
import {Beneficiary} from '../../models/beneficiary.model';
import {AuthService} from '../../core/services/auth/auth.service';
import {BeneficiaryService} from '../../core/services/beneficiary/beneficiary.service';
import {Account} from '../../models/account.model';
import {AccountService} from '../../core/services/account/account.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-beneficiaries',
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf,
    DatePipe,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.css'
})

export class BeneficiariesComponent implements OnInit {
  beneficiaries: any[]=[];

  constructor(
    private beneficiaryService: BeneficiaryService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.auth.getCurrentUser()?.id;

    if (userId) {
      this.beneficiaryService.getByUserId(userId).subscribe(res => {
        this.beneficiaries = res;
        console.log('respuesta del back', res);
      });
    }
  }

  goToAddBeneficiary() {
    this.router.navigate(['/client/beneficiaries/add']);
  }

  deleteBeneficiary(beneficiaryId: number) {
    this.beneficiaryService.deleteBeneficiary(beneficiaryId).subscribe({
      next: () => {
        this.beneficiaries = this.beneficiaries.filter(b => b.beneficiaryId !== beneficiaryId);
      },
      error: () => {
        alert('Error al eliminar beneficiario');
      }
    });
  }

  transferToBeneficiary(accountId: number) {
    this.router.navigate(['/client/transfer'], { queryParams: { targetAccountId: accountId } });
  }
}
