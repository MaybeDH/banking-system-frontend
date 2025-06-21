import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,) {}

  // handleSubmit(): void {
  //   this.error = '';
  //
  //   if (!this.email || !this.password) {
  //     this.error = 'Por favor, completa todos los campos';
  //     return;
  //   }
  //
  //   this.isLoading = true;
  //
  //   // Simulación de login local (sin backend)
  //   setTimeout(() => {
  //     this.isLoading = false;
  //     const testUsers = ['admin@bancodigital.com', 'cliente@bancodigital.com', 'operador@bancodigital.com'];
  //     if (testUsers.includes(this.email) && this.password === '123456') {
  //       alert('Inicio de sesión exitoso');
  //       this.router.navigate(['/admin/dashboard']); // o /client/dashboard, /operator/dashboard según el rol simulado
  //     } else {
  //       this.error = 'Credenciales incorrectas. Intenta nuevamente.';
  //     }
  //   }, 1000);
  // }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        const role = user.rol?.name;
        if (role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'Cliente') {
          this.router.navigate(['/client/dashboard']);
        } else if (role === 'Operador') {
          this.router.navigate(['/operator/dashboard']);
        } else {
          this.errorMessage = 'Rol no válido';
        }
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }

}
