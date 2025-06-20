import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {AuthService} from '../../core/services/auth/auth.service';
import {DatePipe, NgForOf} from '@angular/common';
import {User} from '../../models/user.model';
import {UserService} from '../../core/services/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

  export class ProfileComponent implements OnInit {
  profile: Profile | null  = null;

  user: User | null = null;

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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

