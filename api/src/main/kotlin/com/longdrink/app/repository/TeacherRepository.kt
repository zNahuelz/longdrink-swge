package com.longdrink.app.repository

import com.longdrink.app.model.Employee
import com.longdrink.app.model.Teacher
import org.springframework.data.jpa.repository.JpaRepository

interface TeacherRepository : JpaRepository<Teacher, Long> {
    fun findByCitizenId(citizenId: String): Teacher?
}