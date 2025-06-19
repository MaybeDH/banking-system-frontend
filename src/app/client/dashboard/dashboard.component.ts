import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) {
    console.log("Hello Dashboard");

  }
  ngOnInit() {
    const userId = this.auth.getCurrentUser()?.id;
    console.log(userId);
    console.log("nohay nada?")
  }

}
