import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user = {
    name: 'Admin',
    role: 'admin', // Simulación — reemplaza con AuthService
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.user || this.user.role !== 'admin') {
      this.router.navigate(['/'])
    }
  }

  stats = [
    {
      title: 'Total Usuarios',
      value: '1,234',
      description: '+12% desde el mes pasado',
      icon: 'users',
      color: 'text-blue-600',
    },
    {
      title: 'Cuentas Activas',
      value: '2,456',
      description: '+8% desde el mes pasado',
      icon: 'credit-card',
      color: 'text-green-600',
    },
    {
      title: 'Nuevos Registros',
      value: '89',
      description: 'En los últimos 7 días',
      icon: 'user-check',
      color: 'text-purple-600',
    },
    {
      title: 'Transacciones Hoy',
      value: '567',
      description: '+23% vs ayer',
      icon: 'trending-up',
      color: 'text-orange-600',
    },
  ]

  quickActions = [
    {
      title: 'Crear Usuario',
      description: 'Agregar nuevo usuario al sistema',
      href: '/admin/users/new',
      icon: 'plus',
    },
    {
      title: 'Ver Usuarios',
      description: 'Gestionar usuarios existentes',
      href: '/admin/users',
      icon: 'eye',
    },
    {
      title: 'Crear Cuenta',
      description: 'Abrir nueva cuenta bancaria',
      href: '/admin/accounts/new',
      icon: 'plus',
    },
    {
      title: 'Ver Cuentas',
      description: 'Administrar cuentas existentes',
      href: '/admin/accounts',
      icon: 'eye',
    },
  ]

}
