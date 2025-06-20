import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Profile} from '../../../models/profile.model';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../core/services/auth/auth.service';
import {UserService} from '../../../core/services/user/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-perfil',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})
export class EditPerfilComponent implements  OnInit {
  user: User | null = null;
  editData: any = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    ci: '',
    mobile: '',
    address: '',
    status: '',
    rolId: 0
  };
  successMsg = '';
  errorMsg = '';

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    if (this.user) {
      this.editData.email = this.user.email;
      this.editData.name = this.user.profile?.name || '';
      this.editData.lastName = this.user.profile?.lastName || '';
      this.editData.ci = this.user.profile?.ci || '';
      this.editData.mobile = this.user.profile?.mobile || '';
      this.editData.address = this.user.profile?.address || '';
      this.editData.status = this.user.profile?.status || '';
      this.editData.rolId = this.user.rol?.rolId || 0;
    }
  }

  onSubmit() {
    if (!this.user) return;
    const payload = { ...this.editData };
    this.userService.updateUser(this.user.id, payload).subscribe({
      next: (res) => {
        this.successMsg = 'Perfil actualizado correctamente';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = 'Error al actualizar el perfil';
        this.successMsg = '';
      }
    });
  }
}
