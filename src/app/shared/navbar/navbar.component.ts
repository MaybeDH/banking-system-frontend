import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    // this.router.navigate(['/auth/login']);
  }

}
