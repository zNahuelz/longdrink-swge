import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../../model/login.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.css'
})
export class LoginCardComponent {
  authService = inject(AuthService);
  router = inject(Router);
  emailIsValid = signal(false);
  passwordIsValid = signal(false);

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

  onSubmit(event: Event){
    event.preventDefault();
    const emailPassValid = this.emailCtrl.valid && this.passwordCtrl.valid;

    if (emailPassValid){
/*       this.loginInfo.update((prevState) =>{
        return {
          email: this.emailCtrl.value,
          password: this.passwordCtrl.value
        }
      }) */
      let email = this.emailCtrl.value;
      let password = this.passwordCtrl.value;
      this.authService.login({email,password}).subscribe(() =>{
        alert('Inicio de Sesión exitoso!');
        this.router.navigate(['/test']);
      })

      //alert(`Excelente, ha iniciado sesión con estos datos ->\n Email: ${this.loginInfo().email}\n Contraseña: ${this.loginInfo().password}`)
    }
  }

  validatingEmail(){
    return !this.emailCtrl.valid && this.emailCtrl.value !== ''
  }

  validatingPassword(){
    return (!this.passwordCtrl.valid) && (this.passwordCtrl.value.length < 5)  && (this.passwordCtrl.value !== '');
  }

}
