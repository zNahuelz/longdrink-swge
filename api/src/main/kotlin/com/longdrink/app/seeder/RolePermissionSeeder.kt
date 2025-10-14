package com.longdrink.app.seeder

import com.longdrink.app.model.Permission
import com.longdrink.app.model.Role
import com.longdrink.app.repository.PermissionRepository
import com.longdrink.app.repository.RoleRepository
import jakarta.transaction.Transactional
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component

@Component
@Order(1)
class RolePermissionSeeder(
    private val roleRepository: RoleRepository,
    private val permissionRepository: PermissionRepository
) : Seeder {

    @Transactional
    override fun run() {
        val defaultPermissions = listOf(
            Triple("ROOT", "Permisos administrativos.", "Permite el uso de todas las funciones del sistema.")
        )

        val savedPermissions = defaultPermissions.map { (key, name, description) ->
            permissionRepository.findByKey(key) ?: permissionRepository.save(
                Permission(key = key, name = name, description = description)
            )
        }.toMutableSet()

        @Suppress("UNUSED_VARIABLE")
        val adminRole = roleRepository.findByName("ADMINISTRADOR")
            ?: roleRepository.save(Role(name = "ADMINISTRADOR", permissions = savedPermissions))

        @Suppress("UNUSED_VARIABLE")
        val teacherRole = roleRepository.findByName("DOCENTE") ?: roleRepository.save(Role(name = "DOCENTE"))

        @Suppress("UNUSED_VARIABLE")
        val studentRole = roleRepository.findByName("ALUMNO") ?: roleRepository.save(Role(name = "ALUMNO"))

        @Suppress("UNUSED_VARIABLE")
        val receptionistRole = roleRepository.findByName("SECRETARIA") ?: roleRepository.save(Role(name = "SECRETARIA"))

        println("[DB - SEEDER] Roles y permisos creados.")
    }
}