package com.longdrink.app.repository

import com.longdrink.app.model.Employee
import com.longdrink.app.model.Teacher
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TeacherRepository : JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {
    fun findByCitizenId(citizenId: String): Teacher?
}