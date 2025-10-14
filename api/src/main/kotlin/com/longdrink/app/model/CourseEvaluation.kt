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
@Table(name = "course_evaluations")
data class CourseEvaluation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = true)
    val course: Course? = null,

    @Column(length = 50, nullable = false)
    val name: String,

    @Column(name = "max_score")
    val maxScore: Double,

    val weight: Double,

    @Column(name = "display_order", nullable = true)
    val displayOrder: Int? = null,

    @Column(name = "is_mandatory", nullable = false)
    val isMandatory: Boolean = true,

    @Column(name = "is_default", nullable = false)
    val isDefault: Boolean = false,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()
