import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements  OnInit {
  role: string | null = null;

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.role = this.auth.getUserRole();
  }

  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isClient(): boolean {
    return this.role === 'Cliente';
  }

  isOperator(): boolean {
    return this.role === 'Operador';
  }
}
