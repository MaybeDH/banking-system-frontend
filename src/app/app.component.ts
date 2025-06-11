import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginFormComponent from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mi primera variable';
  nombre = 'Hassel';
  apellido = 'Cano';
  edad :number = 19;
}
