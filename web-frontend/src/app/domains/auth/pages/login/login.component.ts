import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../../model/login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  emailIsValid = signal(false);
  passwordIsValid = signal(false);
  formError = ''

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

  onSubmit(event: Event) {
    event.preventDefault();
    const emailPassValid = this.emailCtrl.valid && this.passwordCtrl.valid;
    if (emailPassValid) {
      let email = this.emailCtrl.value;
      let password = this.passwordCtrl.value;

      this.authService.login({ email, password }).subscribe({
        next: () => this.router.navigate(['a','dashboard']),
        error: () => {
          this.passwordCtrl.setValue('');
          this.emailCtrl.setValue('');
          this.formError = '';
        }
      })
    }
    else{
      this.formError = "Ups! Debe llenar el e-mail y la contraseña con el formato correcto."
    }

  }

  validatingEmail() {
    return !this.emailCtrl.valid && this.emailCtrl.value !== ''
  }

  validatingPassword() {
    return (!this.passwordCtrl.valid) && (this.passwordCtrl.value.length < 5) && (this.passwordCtrl.value !== '');
  }
}
