import {Component, OnDestroy, OnInit} from '@angular/core';
import {Rol} from '../../../models/rol.model';
import {CreateUserRequest} from '../../../models/create-user-request.model';
import {RolService} from '../../../core/services/rol/rol.service';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user/user.service';
import {User} from '../../../models/user.model';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-new-user',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit, OnDestroy {

  user: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    ci: string;
    mobile: string;
    address: string;
    status: string;
    rolId: number | null;
  } = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    ci: '',
    mobile: '',
    address: '',
    status: 'ACTIVO',
    rolId: null,
  };

  roles: Rol[] = [];
  responseMessage:string='';
  showToast:boolean=false;

  constructor(private userService: UserService,
              private router: Router,
              private rolService: RolService) {
  }
  ngOnInit(): void {
    this.rolService.getRol().subscribe(
      (roles)=>{
        this.roles = roles;
      },(error)=>{
        console.log('Error al obtener los roles',error);
      }
    );
  }
  saveUser(): void {
    this.user.rolId=Number(this.user.rolId)

    console.log(this.user);
    this.userService.saveUser(this.user).subscribe(
      (response)=>{
        this.showToast = true;
        this.responseMessage = 'Saved successfully';
        setTimeout(()=>{
          this.router.navigate(['/admin/users']);
        },2000);
      },(error)=>{
        console.error("Error al guardar el usuario",error);
        this.responseMessage = 'Error al guardar el usuario';
      }

    )
  }

  ngOnDestroy(): void {
    this.responseMessage = '';
  }

}
