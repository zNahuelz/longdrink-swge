package com.longdrink.app.service

import com.longdrink.app.dto.UserProfile
import com.longdrink.app.exception.ApiException
import com.longdrink.app.repository.UserRepository
import com.longdrink.app.util.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val jwtUtil: JwtUtil
) {
    private val passwordEncoder = BCryptPasswordEncoder()
    fun login(username: String, password: String): String {
        val user = userRepository.findByUsername(username)
            ?: throw ApiException(HttpStatus.UNAUTHORIZED, "Inicio de Sesión fallido. Verifique sus credenciales.")

        if (!passwordEncoder.matches(password, user.password)) {
            throw ApiException(HttpStatus.UNAUTHORIZED, "Inicio de Sesión fallido. Verifique sus credenciales.")
        }

        val permissions = user.role?.permissions?.map { it.key } ?: emptyList()

        return jwtUtil.generateToken(user.username, permissions)
    }

    fun getCurrentUserProfile(): UserProfile {
        val authentication = SecurityContextHolder.getContext().authentication
            ?: throw IllegalStateException("No authentication found")

        val username = authentication.name
            ?: throw IllegalStateException("Authenticated user has no username")

        val user = userRepository.findByUsername(username)
            ?: throw IllegalStateException("User not found")

        val personalInfo = when {
            user.teacher != null -> mapOf(
                "type" to "TEACHER",
                "id" to user.teacher!!.id,
                "names" to user.teacher!!.names,
                "paternalSurname" to user.teacher!!.paternalSurname,
                "maternalSurname" to user.teacher!!.maternalSurname,
                "citizenId" to user.teacher!!.citizenId,
                "citizenIdType" to user.teacher!!.citizenIdType,
                "phone" to user.teacher!!.phone,
                "address" to user.teacher!!.address,
                "birthDate" to user.teacher!!.birthDate,
                "hiringDate" to user.teacher!!.hiringDate,
                "dismissalDate" to user.teacher!!.dismissalDate
            )

            user.student != null -> mapOf(
                "type" to "STUDENT",
                "id" to user.student!!.id,
                "names" to user.student!!.names,
                "paternalSurname" to user.student!!.paternalSurname,
                "maternalSurname" to user.student!!.maternalSurname,
                "citizenId" to user.student!!.citizenId,
                "citizenIdType" to user.student!!.citizenIdType,
                "phone" to user.student!!.phone,
                "address" to user.student!!.address,
                "birthDate" to user.student!!.birthDate
            )

            user.employee != null -> mapOf(
                "type" to "EMPLOYEE",
                "id" to user.employee!!.id,
                "names" to user.employee!!.names,
                "paternalSurname" to user.employee!!.paternalSurname,
                "maternalSurname" to user.employee!!.maternalSurname,
                "citizenId" to user.employee!!.citizenId,
                "citizenIdType" to user.employee!!.citizenIdType,
                "phone" to user.employee!!.phone,
                "address" to user.employee!!.address,
                "birthDate" to user.employee!!.birthDate,
                "hiringDate" to user.employee!!.hiringDate,
                "dismissalDate" to user.employee!!.dismissalDate,
                "position" to user.employee!!.position
            )

            else -> emptyMap()
        }

        return UserProfile(
            id = user.id,
            username = user.username,
            email = user.email,
            profilePicture = user.profilePicture,
            role = user.role?.let {
                mapOf(
                    "id" to it.id,
                    "name" to it.name
                )
            } ?: emptyMap(),
            permissions = user.role?.permissions?.map {
                Triple(it.id, it.key, it.name ?: "")
            } ?: emptyList(),
            personalInfo = personalInfo
        )
    }
}