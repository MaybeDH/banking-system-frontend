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
  deleteProfile(id:number) {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil?')) {  // Confirmación antes de eliminar
      console.log(id);
      this.profileService.deleteProfile(id).subscribe()
    //   deleteProfile(id).subscribe(
    //     () => {
    //       // Actualizar la lista de usuarios después de eliminar
    //       this.profiles = this.profiles.filter(profile => profile.profileId !== id);
    //     },
    //     (error) => {
    //       console.error('Error al eliminar el usuario:', error);
    //       alert('Hubo un error al intentar eliminar el usuario.');
    //     }
    //   );
    // }


  }}

  protected readonly Number = Number;
}
