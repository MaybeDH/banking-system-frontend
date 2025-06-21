import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {UserService} from '../../core/services/user/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User | null=null;
  constructor(private auth: AuthService, private userService: UserService) {
    console.log("Hello Dashboard");

  }
  ngOnInit() {
    // const userId = this.auth.getCurrentUser()?.id;
    // console.log(userId);

    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.id;
    console.log(userId);

    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        console.log('User', data);
      });

  }}}


