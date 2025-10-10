package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(length = 20, nullable = false, unique = true)
    val username: String = "",

    @Column(length = 50, nullable = false, unique = true)
    val email: String = "",

    @Column(nullable = false)
    val password: String = "",

    @Column(name = "profile_picture")
    val profilePicture: String? = null,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    val role: Role? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", unique = true)
    val teacher: Teacher? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", unique = true)
    val student: Student? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", unique = true)
    val employee: Employee? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,

    ) : Auditable()