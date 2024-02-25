import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements AfterViewInit {
  authService = inject(AuthService);
  router = inject(Router);

  user: any;
  loaded = false;
  ngAfterViewInit(): void {
    this.user = this.authService.obtenerUsuario().subscribe({
      next: data => {
        this.user = data;
        this.loaded = true;
        console.log(this.user)
      },
      error: err => this.signOut()
    })
  }

  signOut(){
    this.authService.cerrarSesion();
  }
}
