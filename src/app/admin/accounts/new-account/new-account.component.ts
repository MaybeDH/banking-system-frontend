import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../core/services/user/user.service';
import {AccountService} from '../../../core/services/account/account.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-new-account',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent implements OnInit {
  accountForm!: FormGroup;
  users: User[] = [];  // Para almacenar la lista de usuarios
  selectedUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      userSearch: [''],
      accountType: ['ahorros'],  // Predeterminado a cuenta de ahorros
      currency: ['USD'],  // Predeterminado a USD
      initialBalance: [0]
    });

    // Obtener todos los usuarios al cargar el componente
    this.getUsers();
  }

  // Función para obtener usuarios
  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  // Función para manejar el formulario de creación de cuenta
  onSubmit(): void {
    if (this.selectedUserId !== null) {
      const accountData = {
        userId: this.selectedUserId,
        currency: this.accountForm.value.currency,
        type: this.accountForm.value.accountType,
        balance: this.accountForm.value.initialBalance,
        status: 'active'  // O el estado que sea necesario
      };

      // Crear la cuenta
      this.accountService.createAccount(accountData).subscribe(response => {
        this.router.navigate(['/admin/accounts']);
      });
    }
  }

  // Función para seleccionar un usuario
  // selectUser(userId: number): void {
  //   this.selectedUserId = userId;
  // }
  selectUser(user: User): void {
    console.log('Usuario seleccionado:', user); // Debug
    console.log('Usuario seleccionado:', user.id); // Debug
    this.selectedUserId = user.id;
    this.accountForm.patchValue({ userSearch: user.profile?.name || user.email });
  }

  filteredUsers: any[] = [];

  filterUsers(): void {
    const searchTerm = this.accountForm.value.userSearch.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.profile?.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
    );
  }

}
