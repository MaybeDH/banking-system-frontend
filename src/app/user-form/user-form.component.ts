import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export default class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: [''],
      password: [''],
      name: [''],
      lastName: [''],
      birthday: [''],
      gender: ['']
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {

        // this.userForm.patchValue(user);
        const userData = {
          email: user.email,
          password: user.password,
          name: user.profile?.name || null,
          lastName: user.profile?.lastName || null,
          birthday: user.profile?.birthday || null,
          gender: user.profile?.gender || null,
        }
        this.userForm.patchValue(userData);
      });
    }


  }
  onSubmit(): void {
    const userData = this.userForm.value;

    if (this.userId) {
      userData.id = this.userId;
      this.userService.updateUser(userData).subscribe(() => {
        this.router.navigate(['/user-list']);
      });
    } else {
      this.userService.saveUser(userData).subscribe(() => {
        this.router.navigate(['/user-list']);
      });

  }
}
}
