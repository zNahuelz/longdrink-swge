<script setup>
import ResourcesService from "@/services/resources.service.js";
import {onMounted, ref} from "vue";
import moment from "moment";
import 'moment/locale/es';

const resources = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const loading = ref(true);
moment.locale('es'); //TODO...

async function getResources(page = 1) {
  await ResourcesService.getResources(page).then((data) => {
    currentPage.value = data.current_page;
    lastPage.value = data.last_page;
    resources.value = data.data;
    loading.value = false;
  }).catch((err) => {
    console.log(err)
  })
}


async function downloadFile(id) {
  //TODO...
}

onMounted(() => {
  getResources();
})
</script>

<template>
  <div v-if="loading" class="loading-overlay">
    <div class="row">
      <div class="spinner-border me-2" role="status">
      </div>
    </div>
    <h3 class="ms-3">Cargando guías de estudio...</h3>
  </div>

  <div class="card text-center" v-if="!loading">
    <div class="card-header bg-primary text-white fw-bold fs-5">
      <i class="bi bi-calendar4-week"></i> Listado de Turnos
    </div>
    <div class="card-body">
      <div class="container ps-5 pe-5 mt-3 mb-3">
        Filtrado de Tabla...
        <div class="container text-center" v-if="resources.length <= 0 || !resources">
          <i class="bi bi-exclamation-triangle text-dark" style="font-size: 100px"></i>
          <h3 class="text-dark">Oops! No se han encontrado guías de estudio.</h3>
        </div>
        <table class="table table-secondary table-striped-columns table-bordered border-dark"
               v-if="resources.length >= 1">
          <thead>
          <tr>
            <th>#</th>
            <th>ARCHIVO</th>
            <th>DESCRIPCIÓN</th>
            <th>FECHA DE SUBIDA</th>
            <th>HERRAMIENTAS</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="r in resources" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.name }}</td>
            <td>{{ r.description }}</td>
            <td>{{ moment(r.created_at).format('MMMM D, YYYY') }}</td>
            <td>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-dark dropdown-toggle btn-sm" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  <i class="bi bi-gear-wide-connected"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item fw-bold text-dark" @click="downloadFile(r.id)">Descargar</a></li>
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