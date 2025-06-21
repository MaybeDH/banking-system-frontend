import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {Rol} from '../../models/rol.model';

@Component({
  selector: 'app-navbar',
  imports: [
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements  OnInit {
  email: string | null = null;
  role: string | null = null;
  // initials: string = ''; // Para las iniciales del avatar
  //
  constructor(private auth: AuthService) {}
  //
ngOnInit() {
  const userString = localStorage.getItem('user') || '';
  if (!userString) {
    return ;
  }
  const user = JSON.parse(userString);
    this.email = user?.email || '';
    this.role = user?.rol.name;
}

  // ngOnInit(): void {
  //   const currentUser = this.auth.getCurrentUser();
  //   if (currentUser) {
  //     this.email = currentUser.email;
  //     this.role = currentUser.rol;
  //
  //     // Generar iniciales del usuario
  //     const nameParts = currentUser.profile.name?.split(' ') || [];
  //     this.initials = nameParts.length > 1
  //       ? nameParts[0][0] + nameParts[1][0]
  //       : nameParts[0][0];
  //   }
  // }

  logout(): void {
    localStorage.removeItem('user');
    window.location.reload();
  }

}
