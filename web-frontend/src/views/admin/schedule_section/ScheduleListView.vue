<script setup>
import ScheduleService from "@/services/schedule.service.js";
import {onMounted, ref} from "vue";

const scheduleList = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const loading = ref(true);

const daysOfWeek = ref(new Map([
  [1, 'LUNES'],
  [2, 'MARTES'],
  [3, 'MIERCOLES'],
  [4, 'JUEVES'],
  [5, 'VIERNES'],
  [6, 'SABADO'],
  [7, 'DOMINGO'],
]));

async function getScheduleList(page = 1) {
  await ScheduleService.getSchedules(page).then((data) => {
    currentPage.value = data.current_page;
    lastPage.value = data.last_page;
    scheduleList.value = data.data;
    console.log(scheduleList.value);
    loading.value = false;
    console.log(daysOfWeek.value.get(3));
  }).catch((err) => {
    console.log(err)
  })
}

onMounted(() => {
  getScheduleList();
})


</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <div class="row">
      <div class="spinner-border me-2" role="status">
      </div>
    </div>
    <h3 class="ms-3">Cargando turnos...</h3>
  </div>

  <div class="card text-center" v-if="!loading">
    <div class="card-header bg-primary text-white fw-bold fs-5">
      <i class="bi bi-calendar4-week"></i> Listado de Turnos
    </div>
    <div class="card-body">
      <div class="container ps-5 pe-5 mt-3 mb-3">
        Filtrado de Tabla...
        <div class="container text-center" v-if="scheduleList.length <= 0 || !scheduleList">
          <i class="bi bi-exclamation-triangle text-dark" style="font-size: 100px"></i>
          <h3 class="text-dark">Oops! No se han encontrado turnos.</h3>
        </div>
        <table class="table table-secondary table-striped-columns table-bordered border-dark"
               v-if="scheduleList.length >= 1">
          <thead>
          <tr>
            <th>#</th>
            <th>HORA INICIO</th>
            <th>HORA FIN</th>
            <th>DÍA</th>
            <th>HERRAMIENTAS</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="s in scheduleList" :key="s.id">
            <td>{{ s.id }}</td>
            <td>{{ s.start_time }}</td>
            <td>{{ s.end_time }}</td>
            <td>{{ daysOfWeek.get(s.week_day) }}</td>
            <td>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-dark dropdown-toggle btn-sm" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  <i class="bi bi-gear-wide-connected"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item fw-bold text-dark" href="#">Detalles</a></li>
                  <li><a class="dropdown-item fw-bold text-dark" href="#">Editar</a></li>
                  <li><a class="dropdown-item fw-bold text-dark" href="#">Eliminar</a></li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        Botones <>
      </div>

    </div>
    <div class="card-footer text-body-secondary">
      Notas...
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

/* Centering the spinner */
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>