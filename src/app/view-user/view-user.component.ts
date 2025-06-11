import {Component, OnInit} from '@angular/core';

import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../service/user.service';
@Component({
  selector: 'app-view-user',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export default class ViewUserComponent  implements OnInit {
  user:any=null;
  constructor(
    private router:ActivatedRoute,
    private userService:UserService,
  ) {
  }
  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error al obtener el usuario', err)
    });
  }
}
