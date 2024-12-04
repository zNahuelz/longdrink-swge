<script setup>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import router from '@/router';
import ScheduleService from "@/services/schedule.service.js";
import {ref} from "vue";

const schema = Yup.object().shape({
  startTime: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/,
      'El tiempo debe estar en formato de 24 horas. HH:mm').required('Debe ingresar la hora de inicio.'),
  endTime: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/,
      'El tiempo debe estar en formato de 24 horas. HH:mm').required('Debe ingresar la hora de finalización'),
  timeValidation: Yup.object().test(
      'start-before-end',
      'La hora de inicio debe estar antes de la hora final.',
      function (value) {
        const {startTime, endTime} = this.parent;
        const start = new Date(`2024-01-01T${startTime}:00`);
        const end = new Date(`2024-01-01T${endTime}:00`);
        if (start >= end) {
          return false;
        }
        return true;
      }
  ),
});

const weekDay = ref(1);

async function onSubmit(values, {setErrors}) {
  values.week_day = weekDay.value;
  ScheduleService.addSchedule(values).then((response) => {
    Swal.fire('Operación exitosa!', response.message, 'success').then((e) => {
      if (e.dismiss || e.isDismissed || e.isConfirmed) {
        window.location.reload();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-90">
    <div class="card text-center" style="width: 30rem;">
      <div class="card-header bg-primary text-white fw-bold fs-5">
        <i class="bi bi-alarm"></i> Crear Turno
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm }">
          <div class="row mt-3">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-clock-history"></i></div>
              <Field type="time" class="form-control" autoComplete="startTime"
                     :class="{ 'is-invalid': errors.startTime }" name="startTime"/>
              <div class="invalid-feedback text-center">{{ errors.startTime }}</div>
            </div>
          </div>
          <div class="row">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-clock-history"></i></div>
              <Field type="time" class="form-control" autoComplete="endTime" :class="{ 'is-invalid': errors.endTime }"
                     name="endTime"/>
              <div class="invalid-feedback text-center">{{ errors.endTime }}</div>
            </div>
          </div>
          <div class="row">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-calendar4-week"></i></div>
              <select class="form-select" v-model="weekDay">
                <option value="1" selected>LUNES</option>
                <option value="2">MARTES</option>
                <option value="3">MIERCOLES</option>
                <option value="4">JUEVES</option>
                <option value="5">VIERNES</option>
                <option value="6">SÁBADO</option>
                <option value="7">DOMINGO</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div v-if="errors.timeValidation" class="text-danger">{{ errors.timeValidation }}</div>
          </div>
          <div class="row text-center">
            <div class="col">
              <button type="submit" class="btn btn-primary me-3 fw-bold"><i class="bi bi-floppy-fill"></i> Guardar
              </button>
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
  </div>
</template>

<style scoped>

</style>