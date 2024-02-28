import { Routes } from '@angular/router';

import { TestComponent } from './domains/test/test.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './domains/auth/pages/register/register.component';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { BaseComponent } from './domains/shared/components/base/base.component';
import { MyProfileComponent } from './domains/shared/pages/my-profile/my-profile.component';
import { NuevoProfesorComponent } from './domains/admin/pages/profesor/nuevo-profesor/nuevo-profesor.component';
import { ListadoProfesoresComponent } from './domains/admin/pages/profesor/listado-profesores/listado-profesores.component';

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
      },
      {
        path: 'teacher',
        children: [
          {
            path: 'new',
            component: NuevoProfesorComponent,
            title: 'Long Drink - Contratar Docente'
          },
          {
            path: 'list',
            component: ListadoProfesoresComponent,
            title: 'Long Drink - Listado Docentes'
          }
        ]
      }
    ],
    canActivate: [authGuard] //Middleware.
  }
];
