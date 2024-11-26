<script setup>
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
                        <form action="" class="ms-2 me-2">
                            <div class="container text-center mb-3">
                                <img src="@/assets/logos/Logo_Color.png" style="width: 50%;">
                            </div>
                            <div class="form-floating mb-2">
                                <div class="input-group">
                                    <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                    <input type="text" class="form-control" placeholder="Ingrese su Usuario"
                                        autoComplete="username" />
                                </div>
                            </div>
                            <div class="form-floating mb-3">
                                <div class="input-group">
                                    <div class="input-group-text"><i class="bi bi-shield-lock-fill"></i></div>
                                    <input type="text" class="form-control" placeholder="Ingrese su Contraseña"
                                        autoComplete="password" />
                                </div>
                            </div>
                            <div class="container text-center mb-2">
                                <button type="button" class="btn btn-primary text-white me-2"><i
                                        class="bi bi-check-lg"></i> Continuar</button>
                                <button type="button" class="btn btn-dark text-white"><i class="bi bi-eraser-fill"></i>
                                    Limpiar</button>
                            </div>
                            <div class="container text-center fw-light">
                                ¿Olvidó su contraseña?
                            </div>
                        </form>
                    </div>

                    <div class="card-footer text-body-secondary">
                        <span class="text-danger"><i class="bi bi-exclamation-circle-fill"></i></span> N/A
                    </div>
                </div>
            </div>
        </div>
    </main>


</template>