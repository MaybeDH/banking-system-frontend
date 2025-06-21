import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {Profile} from '../../models/profile.model';
import {User} from '../../models/user.model';
import {AuthService} from '../../core/services/auth/auth.service';
import {UserService} from '../../core/services/user/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  profile: Profile | null  = null;
  user: User | null = null;

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.id;
    console.log('Current user', userId);
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        console.log('User', data);
      });
    }
  }
  get cuentasActivas() {
    return this.user?.accounts?.filter(cuenta => cuenta.status === 'Activa') || [];
  }

}
