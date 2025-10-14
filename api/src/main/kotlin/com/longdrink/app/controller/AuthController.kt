package com.longdrink.app.controller

import com.longdrink.app.dto.LoginRequest
import com.longdrink.app.dto.LoginResponse
import com.longdrink.app.dto.UserProfile
import com.longdrink.app.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val token = authService.login(request.username, request.password)
        return ResponseEntity.ok(LoginResponse(token, "Bearer"))
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    fun profile(): ResponseEntity<UserProfile> {
        val user = authService.getCurrentUserProfile()
        return ResponseEntity.ok(user)
    }
}