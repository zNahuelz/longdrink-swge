package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.CascadeType
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
import jakarta.persistence.OneToMany
import jakarta.persistence.PrePersist
import jakarta.persistence.Table
import java.time.LocalDateTime


@Entity
@Table(name = "student_section")
data class StudentSection(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    val student: Student,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    val section: Section,

    val enrolledAt: LocalDateTime = LocalDateTime.now(),

    @Enumerated(EnumType.STRING)
    val status: EnrollmentStatus = EnrollmentStatus.ACTIVE,

    @OneToMany(mappedBy = "studentSection", cascade = [CascadeType.ALL], orphanRemoval = true)
    val attendanceRecords: MutableList<Attendance> = mutableListOf(),

    @OneToMany(mappedBy = "studentSection", cascade = [CascadeType.ALL], orphanRemoval = true)
    val grades: MutableList<Grade> = mutableListOf(),

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()

enum class EnrollmentStatus { ACTIVE, DROPPED, COMPLETED }