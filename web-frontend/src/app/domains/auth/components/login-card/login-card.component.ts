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
    const correo = this.emailCtrl.value
    const correoValido = this.emailCtrl.valid
    const contra = this.passwordCtrl.value
    this.loginInfo.update((prevState) =>{
      return {
        email: correo,
        password: contra
      }
    })
    console.log(this.loginInfo())
    console.log(correoValido)
  }
}
