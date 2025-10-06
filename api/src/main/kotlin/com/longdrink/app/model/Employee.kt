package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "employee")
data class Employee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(length = 30, nullable = false)
    val names: String = "",

    @Column(length = 30, nullable = false)
    val paternalSurname: String = "",

    @Column(length = 30, nullable = false)
    val maternalSurname: String = "",

    @Column(name = "citizen_id", length = 20, nullable = false, unique = true)
    val citizenId: String = "",

    @Column(name = "citizen_id_type", length = 30, nullable = false)
    val citizenIdType: String = "",

    @Column(length = 15, nullable = false)
    val phone: String = "",

    @Column(length = 100, nullable = false)
    val address: String = "",

    @Column(name = "birth_date", nullable = false)
    val birthDate: LocalDate? = null,

    @Column(name = "hiring_date", nullable = false)
    val hiringDate: LocalDate? = null,

    @Column(name = "dismissal_date", nullable = true)
    val dismissalDate: LocalDate? = null,

    @Column(length = 30, nullable = false)
    val position: String = "",

    @OneToOne(mappedBy = "employee", fetch = FetchType.LAZY)
    val user: User? = null,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,

    ) : Auditable()
