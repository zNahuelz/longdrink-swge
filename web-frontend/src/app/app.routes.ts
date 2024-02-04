import { Routes } from '@angular/router';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { TestComponent } from './domains/test/test.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'test',
    component: TestComponent, canActivate: [authGuard] //Middleware.
  }
];
