<script setup>
import TeacherService from "@/services/teacher.service.js";
import {onMounted, ref} from "vue";
const teacherList = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const loading = ref(true);

async function getTeacherList(page = 1) {
  await TeacherService.getTeachers(page).then((data) => {
    currentPage.value = data.current_page;
    lastPage.value = data.last_page;
    teacherList.value = data.data;
    console.log(teacherList.value);
    loading.value = false;
  }).catch((err) => {
    console.log(err)
  })
}

onMounted(() => {
  getTeacherList();
})


</script>

<template>

  <div v-if="loading" class="loading-overlay">
    <div class="row">
      <div class="spinner-border me-2" role="status">
      </div>
    </div>
    <h3 class="ms-3">Cargando...</h3>
  </div>

  <div class="card text-center" v-if="!loading">
    <div class="card-header bg-primary text-white fw-bold fs-5">
      <i class="bi bi-list-task"></i> Listado de Docentes
    </div>
    <div class="card-body">
<div class="container ps-5 pe-5 mt-3 mb-3">
  Filtrado de Tabla...
  <table class="table table-secondary table-striped-columns table-bordered border-dark " >
    <thead>
    <tr>
      <th>#</th>
      <th>NOMBRES</th>
      <th>AP. PATERNO</th>
      <th>DNI</th>
      <th>TELÉFONO</th>
      <th>FECHA DE CONTRATO</th>
      <th>ACTIVO</th>
      <th>HERRAMIENTAS</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="t in teacherList" :key="t.id">
      <td>{{ t.id }}</td>
      <td>{{ t.name }}</td>
      <td>{{ t.paternal_surname }}</td>
      <td>{{ t.dni }}</td>
      <td>{{ t.phone }}</td>
      <td>{{ t.hiring_date }}</td>
      <td>{{ t.dismissal_date ? 'INACTIVO' : 'ACTIVO'}}</td>
      <td>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-dark dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
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