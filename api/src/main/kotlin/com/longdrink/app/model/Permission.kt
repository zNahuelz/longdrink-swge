package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "permissions")
data class Permission(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(length = 150, nullable = false)
    val name: String = "",

    @Column(length = 150, nullable = false, unique = true)
    val key: String = "",

    @Column(nullable = false)
    val description: String = "",

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,

    ) : Auditable()