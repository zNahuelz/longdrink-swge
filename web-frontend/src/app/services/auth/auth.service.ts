import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Login } from '../../model/login.model';
import { jwtDecode } from 'jwt-decode';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private usuarioLogeado?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor(@Inject(DOCUMENT) private document: Document) { }
  readonly localStorage = this.document.defaultView?.localStorage;

  login(user: {email: string, password: string}): Observable<any> {
    return this.http
      .post('http://127.0.0.1:8000/api/auth/login', user)
      .pipe(
        tap((tokens: any) =>
          this.iniciarSesion(user.email, JSON.stringify(tokens))
        ),
        catchError((error: any) =>{
          alert('Inicio de sesión fallido!')
          return error;
        })
      );
  }

  private iniciarSesion(email: string, token: any){
    this.usuarioLogeado = email;
    this.guardarToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private guardarToken(jwt: string){
    this.localStorage!!.setItem(this.JWT_TOKEN, jwt);
  }

  cerrarSesion(){
    this.localStorage!!.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']); //A modificar.
  }

  //Añadir obtener datos del usuario de ser necesario. /auth/perfil en API.
  obtenerUsuario(){
    return this.http.get('http://127.0.0.1:8000/api/auth/profile')
  }

  sesionIniciada(){
    return this.localStorage?.getItem(this.JWT_TOKEN);
  }

  tokenExpirado(){
    const tokens = this.localStorage!!.getItem(this.JWT_TOKEN)!!;
    if(!tokens) return true;

    const token = JSON.parse(tokens).auth.token;
    const decoded = jwtDecode(token);
    if(!decoded.exp) return true;

    const fechaExpiracion = decoded.exp * 1000;

    const fechaActual = new Date().getTime();
    return fechaExpiracion < fechaActual;
  }
}
