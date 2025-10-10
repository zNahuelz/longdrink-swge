package com.longdrink.app.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class LoginRequest(
    @field:NotBlank(message = "El nombre de usuario no puede estar vacio.")
    @field:Size(min = 5, max = 20, message = "El nombre de usuario debe tener entre 5 y 20 carácteres.")
    val username: String,
    @field:NotBlank(message = "La contraseña no puede estar vacia.")
    @field:Size(min = 5, max = 20, message = "La contraseña debe tener entre 5 y 20 carácteres.")
    val password: String
)
