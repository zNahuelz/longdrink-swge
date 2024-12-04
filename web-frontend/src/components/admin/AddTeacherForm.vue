<script setup>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import router from '@/router';
import TeacherService from "@/services/teacher.service.js";

const schema = Yup.object().shape({
  name: Yup.string()
      .min(1, 'Mínimo 1 carácter.')
      .max(30, 'Máximo 30 caracteres.')
      .matches(/^[a-zA-ZñÑ]{1,30}( [a-zA-ZñÑ]{1,30})?$/, 'Formato de nombres incorrecto.')
      .required('El campo nombres es obligatorio.'),

  paternalSurname: Yup.string()
      .min(1, 'Mínimo 5 caracteres.')
      .max(30, 'Máximo 30 caracteres.')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,30}$/, 'Formato de apellido paterno incorrecto.')
      .required('El apellido paterno es obligatorio.'),

  maternalSurname: Yup.string()
      .min(1, 'Mínimo 5 caracteres.')
      .max(30, 'Máximo 30 caracteres.')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,30}$/, 'Formato de apellido materno incorrecto.')
      .required('El apellido materno es obligatorio.'),

  dni: Yup.string()
      .min(8, 'El DNI debe tener un mínimo de 8 caracteres.')
      .max(15, 'Máximo 15 caracteres.')
      .matches(/^[0-9]{8,15}$/, 'Formato de DNI incorrecto.')
      .required('El DNI es obligatorio.'),

  email: Yup.string()
      .email('Formato de e-mail incorrecto.')
      .max(50, 'El e-mail debe tener máximo 50 caracteres.')
      .required('El e-mail es obligatorio.'),

  phone: Yup.string()
      .min(6, 'El teléfono debe tener un mínimo de 6 caracteres.')
      .max(15, 'Máximo 15 caracteres.')
      .matches(/^\+?[0-9]{6,15}$/, 'Formato de teléfono incorrecto.')
      .required('El teléfono es obligatorio.'),

  address: Yup.string()
      .min(1, 'La dirección debe tener mínimo 1 carácter.')
      .max(100, 'La dirección debe tener máximo 100 caracteres.')
      .required('La dirección es obligatoria.'),

  hiringDate: Yup.date()
      .required('La fecha de contratación es obligatoria.'),

});

async function onSubmit(values, {setErrors}) {
  TeacherService.addTeacher(values).then((response) => {
    Swal.fire('Operación exitosa!',response.message,'success').then((e) => {
      if(e.dismiss || e.isDismissed || e.isConfirmed){
        window.location.reload();
      }
    });
  }).catch((err) => {
    console.log(err);
  })
}
</script>

<template>
  <div class="card text-center">
    <div class="card-header bg-primary text-white fw-bold fs-5">
      <i class="bi bi-pencil-square"></i> Registrar Docente
    </div>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm }">
        <div class="row mt-3">
          <div class="col-6">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese nombres"
                     autoComplete="name" :class="{ 'is-invalid': errors.name }" name="name"/>
              <div class="invalid-feedback text-center">{{ errors.name }}</div>
            </div>
          </div>

          <div class="col-6">
            <div class="input-group">
              <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese apellido paterno"
                     autoComplete="paternalSurname" :class="{ 'is-invalid': errors.paternalSurname }"
                     name="paternalSurname"/>
              <div class="invalid-feedback text-center">{{ errors.paternalSurname }}</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese apellido materno"
                     autoComplete="maternalSurname" :class="{ 'is-invalid': errors.maternalSurname }"
                     name="maternalSurname"/>
              <div class="invalid-feedback text-center">{{ errors.maternalSurname }}</div>
            </div>
          </div>

          <div class="col-6">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-person-vcard"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese DNI"
                     autoComplete="dni" :class="{ 'is-invalid': errors.dni }" name="dni"/>
              <div class="invalid-feedback text-center">{{ errors.dni }}</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-at"></i></div>
              <Field type="email" class="form-control" placeholder="Ingrese e-mail"
                     autoComplete="email" :class="{ 'is-invalid': errors.email }" name="email"/>
              <div class="invalid-feedback text-center">{{ errors.email }}</div>
            </div>
          </div>

          <div class="col-6">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-telephone-fill"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese teléfono o celular"
                     autoComplete="phone" :class="{ 'is-invalid': errors.phone }" name="phone"/>
              <div class="invalid-feedback text-center">{{ errors.phone }}</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="input-group">
              <div class="input-group-text"><i class="bi bi-house-door-fill"></i></div>
              <Field type="text" class="form-control" placeholder="Ingrese dirección"
                     autoComplete="address" :class="{ 'is-invalid': errors.address }" name="address"/>
              <div class="invalid-feedback text-center">{{ errors.address }}</div>
            </div>
          </div>

          <div class="col-6">
            <div class="input-group mb-3">
              <div class="input-group-text"><i class="bi bi-calendar3"></i></div>
              <Field type="date" class="form-control" autoComplete="hiringDate"
                     :class="{ 'is-invalid': errors.hiringDate }" name="hiringDate"/>
              <div class="invalid-feedback text-center">{{ errors.hiringDate }}</div>
            </div>
          </div>
        </div>

        <div class="row text-end mb-3">
          <div class="col-12">
            <button type="submit" class="btn btn-primary me-3 fw-bold"><i class="bi bi-floppy-fill"></i> Guardar</button>
            <button type="button" class="btn btn-dark me-3 fw-bold" @click="resetForm"><i
                class="bi bi-eraser-fill"></i> Limpiar
            </button>
            <button type="button" class="btn btn-danger fw-bold"><i class="bi bi-x-square"></i> Cancelar</button>
          </div>
        </div>
      </Form>
    </div>
    <div class="card-footer text-body-secondary">
      Notas...
    </div>
  </div>
</template>
