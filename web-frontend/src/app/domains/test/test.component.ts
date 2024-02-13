import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [JsonPipe, NavBarComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  authService = inject(AuthService);
  usuario: any;
  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario().subscribe((e) => {
      this.usuario = e;
    })
  }

}
