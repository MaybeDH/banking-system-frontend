import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/services/user/user.service';
import {Rol} from '../../../models/rol.model';
import {RolService} from '../../../core/services/rol/rol.service';
import {NgForOf} from '@angular/common';
// import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements  OnInit {
  userForm!: FormGroup;
  userId: number | null = null;
  roles :Rol[]=[];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private rolService: RolService,
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: [''],
      password: [''],
      name: [''],
      lastName: [''],
      ci:[''],
      mobile: [''],
      address: [''],
      rolId: [null]
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.rolService.getRol().subscribe(rol => {
      this.roles = rol;
    })

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {

        // this.userForm.patchValue(user);
        const userData = {
          email: user.email,
          password: user.password,
          name: user.profile?.name || null,
          lastName: user.profile?.lastName || null,
          ci: user.profile?.ci || null,
          mobile: user.profile?.mobile || null,
          address: user.profile?.address || null,
          rolId: user.rol?.rolId
        }
        this.userForm.patchValue(userData);
      });
    }


  }
  onSubmit(): void {
    const userData = this.userForm.value;
    // Forzar rolId a number
    if (this.userId) {
      userData.id = this.userId;
      userData.rolId = Number(userData.rolId);
      console.log(this.userId);
      console.log("esto es lo que manda", userData)
      this.userService.updateUser(this.userId,userData).subscribe(() => {
        this.router.navigate(['admin/users']);
      });
    } else {
      this.userService.saveUser(userData).subscribe(() => {
        this.router.navigate(['admin/users']);
      });

    }
  }
}
