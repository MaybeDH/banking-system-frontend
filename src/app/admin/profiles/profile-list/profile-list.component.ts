import {Component, OnInit} from '@angular/core';
import { Profile } from '../../../models/profile.model';
import {ProfileService} from '../../../core/services/profile/profile.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];
  constructor(private profileService: ProfileService, private router: Router) { }
  ngOnInit() {
    this.getProfiles();
  }
  getProfiles() {
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

}
