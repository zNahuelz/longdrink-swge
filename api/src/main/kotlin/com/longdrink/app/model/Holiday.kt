package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "holidays")
data class Holiday(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, unique = true)
    val date: LocalDate,

    @Column(nullable = false, length = 100, unique = true)
    val name: String,

    @Column(name = "is_recurring")
    val isRecurring: Boolean = false,

    val description: String? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()
