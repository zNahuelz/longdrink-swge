import { Routes } from '@angular/router';

import { TestComponent } from './domains/test/test.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './domains/auth/pages/register/register.component';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { BaseComponent } from './domains/shared/components/base/base.component';
import { MyProfileComponent } from './domains/shared/pages/my-profile/my-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Long Drink - Inicio de Sesión'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'a', component: BaseComponent, children:
    [
      {
        path: 'dashboard',
        component: TestComponent
      },
      {
        path: 'profile',
        component: MyProfileComponent,
        title: 'Long Drink - Mi Perfil'
      }
    ],
    canActivate: [authGuard] //Middleware.
  }
];
