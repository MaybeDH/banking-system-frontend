import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent implements OnInit {
  public userService = inject(UserService) ;
  public users:any[]=[];
  ngOnInit() {
    this.userService.getALlUsers().subscribe(response => {
      console.log("Daats recibidos", response);
    this.users = response;});
  }
  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: err => console.error('Error al eliminar usuario', err)
      });
    }
  }

}
