package com.longdrink.app.service

import com.longdrink.app.repository.UserRepository
import com.longdrink.app.util.JwtUtil
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepo: UserRepository,
    private val jwtUtil: JwtUtil
) {
    private val passwordEncoder = BCryptPasswordEncoder()
    //TODO: Custom error msg on response.
    fun login(username: String, password: String): String {
        val user = userRepo.findByUsername(username) ?: throw Exception("User not found")
        if (!passwordEncoder.matches(password, user.password)) throw Exception("Invalid credentials")

        val permissions = user.role?.permissions?.map {it.key} ?: emptyList()
        return jwtUtil.generateToken(user.username,permissions)
    }
}