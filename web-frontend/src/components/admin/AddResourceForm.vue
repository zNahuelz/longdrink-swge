<script setup>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import router from '@/router';
import ResourcesService from "@/services/resources.service.js";
import {ref} from "vue";

const uploading = ref(false);

const selectedFile = ref(null);

const schema = Yup.object().shape({
  description: Yup.string().min(1).max(100).required('Debe ingresar una descripción para el documento.'),
  document: Yup.mixed().required('Debe seleccionar un documento.')
});

function onSubmit(values, {setErrors}) {
  uploading.value = true;
  values.document = selectedFile.value;
  ResourcesService.addResource(values).then((response) => {
    Swal.fire('Subida exitosa!', response.message, 'success').then((e) => {
      if (e.dismiss || e.isDismissed || e.isConfirmed) {
        window.location.reload();
      }
    });
  }).catch((err) => {
    console.log(err);
  })
  console.log(values);
}

function handleDocument() {
  selectedFile.value = event.target.files[0]; //TODO: Check this.
}
</script>

<template>

  <div class="d-flex justify-content-center align-items-center vh-90">
    <div class="card text-center" style="width: 30rem;">
      <div class="card-header bg-primary text-white fw-bold fs-5">
        <i class="bi bi-cloud-upload-fill"></i> Subir Guía de Estudio
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="row mt-3">
            <div class="input-group mb-2">
              <div class="input-group-text"><i class="bi bi-file-text"></i></div>
              <Field type="text" class="form-control" autoComplete="description"
                     :class="{ 'is-invalid': errors.description }" name="description"
                     placeholder="Descripción del documento"/>
              <div class="invalid-feedback text-center">{{ errors.description }}</div>
            </div>
          </div>
          <div class="row">
            <div class="input-group mb-2">
              <Field type="file" class="form-control" :class="{ 'is-invalid': errors.document }"
                     name="document" accept=".docx, .pdf, .jpg, .jpeg, .png, .pptx" @change="handleDocument"/>
              <div class="invalid-feedback text-center">{{ errors.document }}</div>
            </div>
          </div>

          <div class="row text-center">
            <div class="col">
              <button type="submit" class="btn btn-primary me-3 fw-bold" :disabled="uploading"><i
                  class="bi bi-floppy-fill" v-show="!uploading"></i> <span v-show="!uploading">Guardar</span>
                <span v-show="uploading"><span class="spinner-border spinner-border-sm me-3"></span>Guardando ...</span>
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