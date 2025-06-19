import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';
interface Stat {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

interface Operation {
  id: string;
  type: string;
  account: string;
  amount: string;
  time: string;
  status: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit {
  user = { name: 'Operador', role: 'operator' }; // Reemplaza con AuthService

  stats: Stat[] = [
    { title: 'Transacciones Hoy', value: '127', description: 'Operaciones procesadas', icon: 'send', color: 'text-blue-600' },
    { title: 'Cuentas Consultadas', value: '89', description: 'Búsquedas realizadas', icon: 'search', color: 'text-green-600' },
    { title: 'Ajustes de Saldo', value: '12', description: 'Modificaciones aprobadas', icon: 'calculator', color: 'text-purple-600' },
    { title: 'Clientes Atendidos', value: '45', description: 'Usuarios asistidos', icon: 'users', color: 'text-orange-600' },
  ];

  quickActions: QuickAction[] = [
    { title: 'Buscar Cuenta', description: 'Consultar información de cuentas', href: '/operator/accounts', icon: 'search', color: 'bg-blue-500' },
    { title: 'Nueva Transacción', description: 'Procesar depósito, retiro o transferencia', href: '/operator/transactions', icon: 'send', color: 'bg-green-500' },
    { title: 'Ajustar Saldo', description: 'Modificar saldo de cuenta', href: '/operator/adjust', icon: 'calculator', color: 'bg-purple-500' },
  ];

  recentOperations: Operation[] = [
    { id: '1', type: 'Depósito', account: '**** 1234', amount: '+$1,500.00', time: '10:30 AM', status: 'Completado' },
    { id: '2', type: 'Retiro', account: '**** 5678', amount: '-$800.00', time: '10:15 AM', status: 'Completado' },
    { id: '3', type: 'Transferencia', account: '**** 9012', amount: '-$2,300.00', time: '09:45 AM', status: 'Completado' },
  ];

  constructor(private router: Router,private auth: AuthService) {}


  email: string | null = null;
  role: string | null = null;
  name: string | null = null;
  // initials: string = ''; // Para las iniciales del avatar
  //
  //



  ngOnInit(): void {
    if (!this.user || this.user.role !== 'operator') {
      this.router.navigate(['/']);
    }
    const userString = localStorage.getItem('user') || '';
    if (!userString) {
      return ;
    }
    const user = JSON.parse(userString);
    this.email = user?.email || '';
    this.role = user?.rol.name;
    this.name = user?.profile.name;

  }
}
