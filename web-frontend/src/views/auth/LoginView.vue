<script setup>
import {Form, Field} from 'vee-validate';
import {useAuthStore} from "@/stores/auth.store.js";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import router from "@/router";
import {ref} from "vue";
import {Notivue, Notifications, push} from "notivue";

const schema = Yup.object().shape({
  username: Yup.string().required('Debe ingresar su nombre de usuario.'),
  password: Yup.string().required('Debe ingresar su contraseña.'),
})
const rememberMe = ref(false);

async function onSubmit(values, {setErrors}) {
  const AuthStore = useAuthStore();
  const {username, password} = values;

  await AuthStore.login(username, password, rememberMe.value).then(() => router.push({name: 'test'})).catch(err => {
    Swal.fire('Oops!', 'Credenciales incorrectas. Intente de nuevo.', 'error').then(() => window.location.reload())
    //push.success('Error! Credenciales incorrectas.');
    setErrors({apiError: err})
  });

}
</script>
<template>
  <main class="mt-5 pt-5"> <!--- vh-100 d-flex align-items-center justify-content-center  m-0 -->
    <div class="container-fluid px-0">

      <div class="row justify-content-center mx-0">

        <div class="card col-12 col-md-3 col-lg-3 border-primary px-0">
          <div class="card-header bg-primary text-white text-center fw-bold p-2">

            <i class="bi bi-person-bounding-box"></i> INICIO DE SESIÓN
          </div>
          <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm }"
                  class="ms-2 me-2">
              <div class="container text-center mb-3">
                <img src="@/assets/logos/Logo_Color.png" style="width: 50%;">
              </div>
              <div class="form-floating mb-2">
                <div class="input-group">
                  <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                  <Field type="text" class="form-control" placeholder="Ingrese su Usuario"
                         autoComplete="username" :class="{ 'is-invalid': errors.username }" name="username"/>
                  <div class="invalid-feedback text-center">{{ errors.username }}</div>
                </div>
              </div>
              <div class="form-floating mb-2">
                <div class="input-group">
                  <div class="input-group-text"><i class="bi bi-shield-lock-fill"></i></div>
                  <Field type="password" class="form-control" placeholder="Ingrese su Contraseña"
                         autoComplete="password" :class="{ 'is-invalid': errors.password }" name="password"/>
                  <div class="invalid-feedback text-center">{{ errors.password }}</div>
                </div>
              </div>

              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" name="rememberMe" v-model="rememberMe"/>
                <label class="form-check-label">
                  Recuérdame
                </label>
              </div>

              <div class="container text-center mb-2">
                <button type="submit" class="btn btn-primary text-white me-2" :disabled="isSubmitting"><i
                    class="bi bi-check-lg" v-show="!isSubmitting"></i> <span v-show="isSubmitting"
                                                                             class="spinner-border spinner-border-sm me-3"></span>
                  Continuar
                </button>
                <button type="button" class="btn btn-dark text-white" @click="resetForm"><i
                    class="bi bi-eraser-fill"></i>
                  Limpiar
                </button>
              </div>
              <div class="container text-center fw-light">
                ¿Olvidó su contraseña?
              </div>
            </Form>
          </div>

          <div class="card-footer text-body-secondary">
            <span class="text-danger"><i class="bi bi-exclamation-circle-fill"></i></span> N/A
          </div>
        </div>
      </div>
    </div>
  </main>

</template>