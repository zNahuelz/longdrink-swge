import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../../model/login.model';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.css'
})
export class LoginCardComponent {
  loginInfo = signal<Login>({
    email: '',
    password: ''
  });

  emailCtrl = new FormControl(
    '',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/)
      ]
    }
  );

  passwordCtrl = new FormControl(
    '',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    }
  );

  onSubmit(){
    const emailPassValid = this.emailCtrl.valid && this.passwordCtrl.valid;

    if (emailPassValid){
      this.loginInfo.update((prevState) =>{
        return {
          email: this.emailCtrl.value,
          password: this.passwordCtrl.value
        }
      })

      alert(`Excelente, ha iniciado sesión con estos datos ->\n Email: ${this.loginInfo().email}\n Contraseña: ${this.loginInfo().password}`)
    }
  }
}
