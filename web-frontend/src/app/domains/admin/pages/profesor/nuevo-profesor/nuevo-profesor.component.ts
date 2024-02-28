import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../../../../services/profesor/profesor.service';

@Component({
  selector: 'app-nuevo-profesor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-profesor.component.html',
  styleUrl: './nuevo-profesor.component.css'
})
export class NuevoProfesorComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  profesorService = inject(ProfesorService);

  submitted = false;

  hireTeacherForm: FormGroup = new FormGroup({
    nombresCtrl: new FormControl(''),
    apellidoPCtrl: new FormControl(''),
    apellidoMCtrl: new FormControl(''),
    dniCtrl: new FormControl(''),
    celularCtrl: new FormControl(''),
    fechaContratoCtrl: new FormControl(''),
    emailCtrl: new FormControl('')
  });

  ngOnInit(): void {
    this.hireTeacherForm = this.formBuilder.nonNullable.group({
      nombresCtrl: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,50}$/)]],
      apellidoPCtrl: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25),Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,25}$/)]],
      apellidoMCtrl: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25),Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,25}$/)]],
      dniCtrl: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]{8,9}$/)]],
      celularCtrl: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(9),Validators.pattern(/^[1-9]\d{8}$/)]],
      fechaContratoCtrl: ['',Validators.required],
      emailCtrl: ['',[Validators.required,Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/), Validators.maxLength(80)]]
    });
  }

  onSubmit(): void{
    this.submitted = true;

    let validateData = this.validateName() &&
    this.validateSurname1() &&
    this.validateSurname2() &&
    this.validateDNI() &&
    this.validatePhone() &&
    this.validateEmail();

    if(!validateData){
      Swal.fire('Error!','Debe llenar los datos con el formato correcto.','warning');
    }
    else{
      let formData = {
        nombre: this.hireTeacherForm.get('nombresCtrl')?.value.toUpperCase().trim(),
        apellido_paterno: this.hireTeacherForm.get('apellidoPCtrl')?.value.toUpperCase().trim(),
        apellido_materno: this.hireTeacherForm.get('apellidoMCtrl')?.value.toUpperCase().trim(),
        dni: this.hireTeacherForm.get('dniCtrl')?.value.trim(),
        telefono: this.hireTeacherForm.get('celularCtrl')?.value.trim(),
        fecha_contratacion: this.hireTeacherForm.get('fechaContratoCtrl')?.value,
        email: this.hireTeacherForm.get('emailCtrl')?.value.toUpperCase().trim()
      }
      this.profesorService.hireTeacher(formData).subscribe({
        next: (data) => {
          let swalContent = `<table class="table table-bordered">
          <thead>
            <tr>
              <th colspan="2">Docente registrado con éxito. A continuación se presentan los datos almacenados.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-bold">APELLIDOS Y NOMBRES</td>
              <td class="fw-light">${data.profesor.apellido_paterno + ' ' + data.profesor.apellido_materno + ' ' + data.profesor.nombre}</td>
            </tr>

            <tr>
            <td class="fw-bold">DNI</td>
            <td class="fw-light">${data.profesor.dni}</td>
            </tr>
            <tr>
            <td class="fw-bold">CELULAR</td>
            <td class="fw-light">${data.profesor.telefono}</td>
            </tr>

            <tr>
            <td class="fw-bold">NOMBRE DE USUARIO</td>
            <td class="fw-light">${data.usuario.nombre_usuario}</td>
            </tr>

            <tr>
            <td class="fw-bold">FECHA DE CONTRATO</td>
            <td class="fw-light">${data.profesor.fecha_contratacion}</td>
            </tr>
          </tbody>
        </table>`
          Swal.fire('Éxito!',swalContent,'success').then((e) => {
            if(e.dismiss || e.isConfirmed || e.isDenied || e.isDismissed){
              window.location.reload();
            }
          })
        },
        error: err => {
          Swal.fire('Error!',err.error.message,'error');
        }
      });

    }
  }

  validateName(){
    return (this.hireTeacherForm.get('nombresCtrl')?.valid) ||
    (this.hireTeacherForm.get('nombresCtrl')?.value.lenght >= 2) ||
    (this.hireTeacherForm.get('nombresCtrl')?.value.lenght <= 50) ||
    (this.hireTeacherForm.get('nombresCtrl')?.value != '');
  }

  validateSurname1(){
    return (this.hireTeacherForm.get('apellidoPCtrl')?.valid) ||
    (this.hireTeacherForm.get('apellidoPCtrl')?.value.lenght >= 2) ||
    (this.hireTeacherForm.get('apellidoPCtrl')?.value.lenght <= 25) ||
    (this.hireTeacherForm.get('apellidoPCtrl')?.value != '');
  }

  validateSurname2(){
    return (this.hireTeacherForm.get('apellidoMCtrl')?.valid) ||
    (this.hireTeacherForm.get('apellidoMCtrl')?.value.lenght >= 2) ||
    (this.hireTeacherForm.get('apellidoMCtrl')?.value.lenght <= 25) ||
    (this.hireTeacherForm.get('apellidoMCtrl')?.value != '');
  }

  validateDNI(){
    return (this.hireTeacherForm.get('dniCtrl')?.valid) ||
    (this.hireTeacherForm.get('dniCtrl')?.value.lenght == 8);
  }

  validatePhone(){
    return (this.hireTeacherForm.get('celularCtrl')?.valid) ||
    (this.hireTeacherForm.get('celularCtrl')?.value.lenght == 9);
  }

  validateHiringDate(){
    let currentDate = new Date();
    return (new Date(this.hireTeacherForm.get('fechaContratoCtrl')?.value).getTime() > currentDate.getTime())
  }

  validateEmail(){
    return (this.hireTeacherForm.get('emailCtrl')?.valid) ||
    (this.hireTeacherForm.get('emailCtrl')?.value.lenght >= 3) ||
    (this.hireTeacherForm.get('emailCtrl')?.value.lenght <= 80);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.hireTeacherForm.controls;
  }

  unsubmitForm(): void{
    this.submitted = false;
  }

}
