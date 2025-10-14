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
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "attendance")
data class Attendance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_section_id", nullable = false)
    val studentSection: StudentSection,

    @Column(nullable = false)
    val date: LocalDate,

    @Enumerated(EnumType.STRING)
    val status: AttendanceStatus = AttendanceStatus.PRESENT,

    @Column(length = 100, nullable = true)
    val note: String? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()

enum class AttendanceStatus { PRESENT, ABSENT, LATE, EXCUSED }
