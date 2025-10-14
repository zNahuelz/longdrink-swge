package com.longdrink.app.repository

import com.longdrink.app.model.Permission
import org.springframework.data.jpa.repository.JpaRepository

interface PermissionRepository : JpaRepository<Permission, Long> {
    fun findByKey(key: String): Permission?
}