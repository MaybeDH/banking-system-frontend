import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {UserService} from '../service/user.service';
// ajusta la ruta según tu proyecto

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']  // <- correcto: styleUrls
})
export default class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: user => {
        console.log('Login exitoso:', user);
        this.router.navigate(['/user-list']);
      },
      error: err => {
        this.errorMessage = err.status === 404
          ? 'Credenciales incorrectas'
          : 'Ocurrió un error. Intenta de nuevo.';
      }
    });
  }
}
