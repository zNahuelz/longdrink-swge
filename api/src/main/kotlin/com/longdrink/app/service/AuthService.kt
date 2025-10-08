package com.longdrink.app.service

import com.longdrink.app.exception.ApiException
import com.longdrink.app.repository.UserRepository
import com.longdrink.app.util.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepo: UserRepository,
    private val jwtUtil: JwtUtil
) {
    private val passwordEncoder = BCryptPasswordEncoder()
    fun login(username: String, password: String): String {
        val user = userRepo.findByUsername(username)
            ?: throw ApiException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado")

        if (!passwordEncoder.matches(password, user.password)) {
            throw ApiException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas")
        }

        val permissions = user.role?.permissions?.map { it.key } ?: emptyList()
        return jwtUtil.generateToken(user.username, permissions)
    }
}