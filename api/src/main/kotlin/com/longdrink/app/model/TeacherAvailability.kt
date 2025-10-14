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
import java.time.LocalTime

@Entity
@Table(name = "teacher_availabilities")
data class TeacherAvailability(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: Teacher,

    @Column(nullable = false)
    val dayOfWeek: Int,

    @Column(name = "start_time", nullable = false)
    val startTime: LocalTime,

    @Column(name = "end_time", nullable = false)
    val endTime: LocalTime,

    @Column(name = "break_start", nullable = false)
    val breakStart: LocalTime,

    @Column(name = "break_end", nullable = false)
    val breakEnd: LocalTime,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()
