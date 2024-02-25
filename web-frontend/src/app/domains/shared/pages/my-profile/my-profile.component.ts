import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  user: any;
  loaded = false;
  disableForm = true;

  securityForm: FormGroup = new FormGroup({
    emailCtrl: new FormControl(''),
    oldPasswordCtrl: new FormControl(''),
    newPasswordCtrl1: new FormControl(''),
    newPasswordCtrl2: new FormControl(''),
  });

  ngOnInit(): void {
    this.authService.obtenerUsuario().subscribe({
      next: data => {
        this.user = data;
        this.loaded = true;
        this.securityForm = this.formBuilder.group({
          emailCtrl: [{value: this.user.email, disabled: this.disableForm},
          {validators: [Validators.required,
          Validators.pattern(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/)]}],

          oldPasswordCtrl: [{value: '', disabled: this.disableForm},
          { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)] }],

          newPasswordCtrl1: [{value: '', disabled: this.disableForm},
          { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)] }],

          newPasswordCtrl2: [{value: '', disabled: this.disableForm},
          { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)] }]
        });
      },
      error: err => {
        this.loaded = false;
        Swal.fire('Error!','Imposible cargar datos del usuario. Debe iniciar sesión nuevamente.','error').then(() => {
          this.authService.cerrarSesion();
        })
      }
    })
  }

  enableForm(): void{
    const controls = Object.keys(this.securityForm.controls);
    controls.forEach((control) => {
      this.securityForm.get(control)?.enable();
    })
    this.disableForm = false;
  }

  onSubmit(): void {
    const formValues = this.securityForm.value;
    const validateData = this.validateOldPassword() &&
      this.validateNewPassword1() &&
      this.validateNewPassword2() &&
      this.validatePasswordEquality();

    if(!validateData){
      Swal.fire('Error!','Debe llenar el formulario con los datos solicitados.','warning');
    }
    else{
      let emailPayload = this.user.email;
      if(this.validateEmail()){
        emailPayload = this.securityForm.get('emailCtrl')?.value;
      }
      this.securityForm.get('emailCtrl')?.setValue(emailPayload);
      let formData = {
        oldPassword: this.securityForm.get('oldPasswordCtrl')?.value,
        newPassword: this.securityForm.get('newPasswordCtrl1')?.value,
        email: emailPayload
      }
      this.authService.updateCredentials(formData).subscribe({
        next: data => {
          Swal.fire('Exito!','Credenciales actualizadas con exito. Usted debe volver a iniciar sesión.','success').then((e) => {
            if(e.dismiss || e.isConfirmed || e.isDismissed){
              this.authService.cerrarSesion();
            }
          })
        },
        error: err => {
          Swal.fire('Error!',err.error.message,'error');
        }
      })
    }
  }

  validateOldPassword(){
    return (this.securityForm.get('oldPasswordCtrl')?.valid) ||
     (this.securityForm.get('oldPasswordCtrl')?.value.lenght >=5) ||
      (this.securityForm.get('oldPasswordCtrl')?.value.lenght <= 20) ||
       (this.securityForm.get('oldPasswordCtrl')?.value != '');
  }

  validateNewPassword1(){
    return (this.securityForm.get('newPasswordCtrl1')?.valid) ||
    (this.securityForm.get('newPasswordCtrl1')?.value.lenght >= 5) ||
    (this.securityForm.get('newPasswordCtrl1')?.value.lenght <= 20);
  }

  validateNewPassword2(){
    return (this.securityForm.get('newPasswordCtrl2')?.valid) ||
    (this.securityForm.get('newPasswordCtrl2')?.value.lenght >= 5) ||
    (this.securityForm.get('newPasswordCtrl2')?.value.lenght <= 20);
  }

  validatePasswordEquality(){
    return (this.securityForm.get('newPasswordCtrl1')?.value === this.securityForm.get('newPasswordCtrl2')?.value);
  }

  validateEmail(){
    return (this.securityForm.get('emailCtrl')?.valid);
  }

}
