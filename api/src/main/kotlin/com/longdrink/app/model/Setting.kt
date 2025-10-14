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
@Table(name = "settings")
data class Setting(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false, length = 100)
    val key: String,

    @Column(nullable = false, length = 500)
    val value: String,

    @Column(nullable = true)
    val description: String? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()
