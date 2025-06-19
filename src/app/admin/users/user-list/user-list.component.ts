import {Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {UserService} from '../../../core/services/user/user.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {  // Confirmación antes de eliminar
      this.userService.deleteUser(id).subscribe(
        () => {
          // Actualizar la lista de usuarios después de eliminar
          this.users = this.users.filter(user => user.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Hubo un error al intentar eliminar el usuario.');
        }
      );
    }}

}
