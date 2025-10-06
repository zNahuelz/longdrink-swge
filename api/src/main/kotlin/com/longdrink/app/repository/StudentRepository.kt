package com.longdrink.app.repository

import com.longdrink.app.model.Employee
import com.longdrink.app.model.Student
import org.springframework.data.jpa.repository.JpaRepository

interface StudentRepository : JpaRepository<Student, Long> {
    fun findByCitizenId(citizenId: String): Student?
}