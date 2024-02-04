import { HttpInterceptorFn } from "@angular/common/http";

//Intercepta solicitudes antes del envio a la API y les coloca token en el header.
export const authInterceptor: HttpInterceptorFn = (req,next) => {
  const jwtToken = getJwtToken();
  if(jwtToken){
    var cloned = req.clone({
      setHeaders: {
        Authorization : `Bearer ${jwtToken}`
      }
    });
    return next(cloned);
  }
  return next(req);
}

function getJwtToken(): string | null{
  let tokens: any = localStorage.getItem('JWT_TOKEN');

  if(!tokens) return null;

  const token = JSON.parse(tokens).auth.token;
  return token;
}
