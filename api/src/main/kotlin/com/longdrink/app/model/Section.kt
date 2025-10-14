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
import jakarta.persistence.Table
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "sections")
data class Section(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    val course: Course,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: Teacher,

    @Column(name = "start_date", nullable = false)
    val startDate: LocalDate,

    @Column(name = "end_date", nullable = false)
    val endDate: LocalDate,

    val capacity: Int = 0,

    @Enumerated(EnumType.STRING)
    val status: SectionStatus = SectionStatus.OPEN,

    @OneToMany(mappedBy = "section", cascade = [CascadeType.ALL], orphanRemoval = true)
    val schedules: MutableList<Schedule> = mutableListOf(),

    @OneToMany(mappedBy = "section", cascade = [CascadeType.ALL], orphanRemoval = true)
    val enrollments: MutableList<StudentSection> = mutableListOf(),

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()

enum class SectionStatus { OPEN, CLOSED, FINISHED, SCHEDULED }