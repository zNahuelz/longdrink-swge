package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "teacher_unavailabilities")
data class TeacherUnavailability(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: Teacher,

    @Column(nullable = false)
    val startDateTime: LocalDateTime,

    @Column(nullable = false)
    val endDateTime: LocalDateTime,

    @Column(nullable = true, length = 255)
    val reason: String? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()
