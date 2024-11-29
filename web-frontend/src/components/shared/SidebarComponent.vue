<script setup>
import {useAuthStore} from "@/stores/auth.store.js";

function signOut() {
  const AuthStore = useAuthStore();
  AuthStore.signOut();
}

</script>

<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

          <div class="container text-center mt-3">
            <img src="@/assets/logos/Logo_Color.png" style="width: 50%;">
          </div>

          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <a href="#" class="nav-link align-middle px-0 text-white">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Inicio</span>
              </a>
            </li>
            <li>
              <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white">
                <i class="fs-4 bi bi-person-workspace"></i> <span class="ms-1 d-none d-sm-inline">Alumnos</span> </a>
              <ul class="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                <li class="w-100">
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Item</span></a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Item</span></a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="nav-link px-0 align-middle text-white">
                <i class="fs-4 bi bi-pencil-square"></i> <span class="ms-1 d-none d-sm-inline">Cursos</span></a>
            </li>
            <li>
              <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white">
                <i class="fs-4 bi bi-person-vcard"></i> <span class="ms-1 d-none d-sm-inline">Docentes</span></a>
              <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                <li class="w-100">
                  <router-link :to="{ name: 'teacher-list' }" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Listado</span></router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'add-teacher' }" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Registrar</span></router-link>
                </li>
              </ul>
            </li>
            <li>
              <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white">
                <i class="fs-4 bi bi-boxes"></i> <span class="ms-1 d-none d-sm-inline">Secciones</span> </a>
              <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                <li class="w-100">
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Product</span> 1</a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Product</span> 2</a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Product</span> 3</a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline text-white">Product</span> 4</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="nav-link px-0 align-middle text-white">
                <i class="fs-4 bi bi-info-square-fill"></i> <span class="ms-1 d-none d-sm-inline">ROL: </span> </a>
            </li>
          </ul>
          <hr>
          <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
               id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle fs-4 me-1"></i>
              <span class="d-none d-sm-inline mx-1">USERNAME</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <li><a class="dropdown-item" href="#">Configuración</a></li>
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" @click="signOut">Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container mt-5">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>