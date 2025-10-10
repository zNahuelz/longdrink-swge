package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "payment_plans")
data class PaymentPlan(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(length = 50, nullable = false)
    val name: String,

    val totalMonths: Int,

    @Column(name = "is_template")
    val isTemplate: Boolean = false,

    @Column(name = "template_name")
    val templateName: String? = null,

    @OneToMany(mappedBy = "paymentPlan", cascade = [CascadeType.ALL], orphanRemoval = true)
    val concepts: MutableList<PaymentConcept> = mutableListOf(),

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()