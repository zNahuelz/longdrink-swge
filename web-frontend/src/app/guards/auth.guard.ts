import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

//Posteriormente añadir middleware que chequee permisos del token y permita o deniegue acceso a x secciones.
export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router);
  if(!authService.sesionIniciada()){
    routerService.navigate(['/']);
    return false;
  }
  return true;
};
