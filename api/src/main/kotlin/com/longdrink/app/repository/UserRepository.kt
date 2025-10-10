package com.longdrink.app.repository

import com.longdrink.app.model.User
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    @EntityGraph(attributePaths = ["teacher", "student", "employee"])
    fun findByUsername(username: String): User?
}