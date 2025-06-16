import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AccountService} from '../service/account.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./account-form.component.css']
})
export default class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  userId!: number;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.accountForm = this.fb.group({
      currencyType: ['Bs', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
  }

  onSubmit(): void {
    const { currencyType, balance } = this.accountForm.value;

    const accountPayload = {
      currencyType,
      balance,
      userId: this.userId
    };

    this.accountService.createAccount(accountPayload).subscribe({
      next: () => this.router.navigate(['/user-list']),
      error: err => {
        console.error(err);
        this.errorMessage = 'Error al crear la cuenta';
      }
    })
  }
}
