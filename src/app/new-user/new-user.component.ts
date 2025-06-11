import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export default class NewUserComponent implements  OnInit {
  user = {
    email: '',
    password: '',
      name: '',
      lastName: '',
      birthday: '',
      gender: ''
  };

  ngOnInit() {
  }

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.saveUser(this.user).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => console.error('Error al guardar usuario:', err)
    });
  }
}
