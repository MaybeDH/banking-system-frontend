import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/profile.model';
import {ProfileService} from '../../core/services/profile/profile.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {User} from '../../models/user.model';
import {UserService} from '../../core/services/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

  export class ProfileComponent implements OnInit {
  profile: Profile | null  = null;

  user: User | null = null;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    console.log('Current user', currentUser);

    const userId = currentUser?.id;
    console.log('Current user', userId);
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        console.log('User', data);
      });
    }
    const profileId = currentUser?.profile?.profileId;
    if(profileId) {
      this.profileService.getProfileById(profileId).subscribe(data => {
        this.profile = data;
        console.log(this.profile);
      })

    }



  }
  get cuentasActivas() {
    return this.user?.accounts?.filter(cuenta => cuenta.status === 'Activa') || [];
  }
}



// constructor(private auth: AuthService,
  //             private profileService: ProfileService,
  //             private userService: UserService) {
  // }
  //
  // ngOnInit() {
  //   const  currentUser = this.auth.getCurrentUser();
  //   console.log('Current user', currentUser);
  //   const profileId = currentUser?.profile?.profileId;
  //   if(profileId) {
  //     this.profileService.getProfileById(profileId).subscribe(data => {
  //       this.profile = data;
  //       console.log(this.profile);
  //     })
  //
  //   }
  //   const userId = currentUser?.userId;
  //   console.log(userId, "pro que no imprime");
  //   if(userId) {
  //     this.userService.getUserById(userId).subscribe(data => {
  //       this.user = data;
  //
  //       console.log("user", data);
  //     })
  //   }
  // }

// }
