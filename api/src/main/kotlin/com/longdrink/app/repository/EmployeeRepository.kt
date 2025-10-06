package com.longdrink.app.repository

import com.longdrink.app.model.Employee
import org.springframework.data.jpa.repository.JpaRepository

interface EmployeeRepository : JpaRepository<Employee, Long> {
    fun findByCitizenId(citizenId: String): Employee?
}