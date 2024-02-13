import { Routes } from '@angular/router';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { TestComponent } from './domains/test/test.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './domains/auth/pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'test',
    component: TestComponent, canActivate: [authGuard] //Middleware.
  }
];
