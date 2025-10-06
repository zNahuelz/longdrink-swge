package com.longdrink.app.controller

import com.longdrink.app.dto.LoginRequest
import com.longdrink.app.dto.LoginResponse
import com.longdrink.app.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val token = authService.login(request.username, request.password)
        return ResponseEntity.ok(LoginResponse(token))
    }
}