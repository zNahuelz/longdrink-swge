package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.DayOfWeek
import java.time.LocalDateTime
import java.time.LocalTime

@Entity
@Table(name = "schedules")
data class Schedule(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    val section: Section,

    @Enumerated(EnumType.STRING)
    val dayOfWeek: DayOfWeek,

    @Column(name = "start_time")
    val startTime: LocalTime,

    @Column(name = "end_time")
    val endTime: LocalTime,

    @Column(length = 50)
    val classroom: String? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()

enum class DayOfWeek { MON, TUE, WED, THU, FRI, SAT, SUN }
