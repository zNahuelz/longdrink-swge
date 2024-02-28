import { Component, OnInit, inject } from '@angular/core';
import { ProfesorService } from '../../../../../services/profesor/profesor.service';
import { Profesor } from '../../../../../model/profesor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-profesores',
  standalone: true,
  imports: [],
  templateUrl: './listado-profesores.component.html',
  styleUrl: './listado-profesores.component.css'
})
export class ListadoProfesoresComponent implements OnInit {
  profesorService = inject(ProfesorService)
  profesores: Profesor[] = [];
  loaded = false;
  ngOnInit(): void {
    this.profesorService.getTeachers().subscribe({
      next: data => {
        console.log(data);
        this.profesores = data.data;
        this.loaded = true;
      },
      error: err => Swal.fire('Error!',err.error.message,'error')
    });

  }

}
