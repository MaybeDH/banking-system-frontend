import {Component, OnInit} from '@angular/core';
import {User} from '../../../../models/user.model';
import {UserService} from '../../../../core/services/user/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgClass, DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    RouterLink,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements  OnInit {

  userId:number|null = null;
  user: User|null = null;
  passwordVisible = false;
  generatedPassword: string | null = null;

  constructor(private userService:UserService,private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    })
  }

  get cuentas() {
    return this.user?.accounts || [];
  }

  get isInactive() {
    return this.user?.profile?.status === 'Inactivo';
  }

  generateRandomPassword(): string {
    // Genera una contraseña segura de 8 caracteres (letras, números y símbolos)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

  resetPassword() {
    if (!this.user) return;
    const newPassword = this.generateRandomPassword();
    this.generatedPassword = newPassword;
    const payload = {
      id: this.user.id,
      email: this.user.email,
      password: newPassword,
      name: this.user.profile?.name || '',
      lastName: this.user.profile?.lastName || '',
      ci: this.user.profile?.ci || '',
      mobile: this.user.profile?.mobile || '',
      address: this.user.profile?.address || '',
      status: this.user.profile?.status || '',
      rolId: this.user.rol?.rolId || 0
    };
    this.userService.updateUser(this.user.id, payload).subscribe();
  }

  togglePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleUserStatus() {
    if (!this.user) return;
    const isInactive = this.user.profile?.status === 'Inactivo';
    const newStatus = isInactive ? 'Activo' : 'Inactivo';
    const payload = {
      id: this.user.id,
      email: this.user.email,
      password: this.user.password || '',
      name: this.user.profile?.name || '',
      lastName: this.user.profile?.lastName || '',
      ci: this.user.profile?.ci || '',
      mobile: this.user.profile?.mobile || '',
      address: this.user.profile?.address || '',
      status: newStatus,
      rolId: this.user.rol?.rolId || 0
    };
    this.userService.updateUser(this.user.id, payload).subscribe(() => {
      if (this.user && this.user.profile) this.user.profile.status = newStatus as 'Activo' | 'Inactivo';
    });
  }

  deleteUser() {
    if (!this.user) return;

      this.userService.deleteUser(this.user.id).subscribe();

  }


}
