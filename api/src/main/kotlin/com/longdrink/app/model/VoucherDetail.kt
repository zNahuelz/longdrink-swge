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
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "voucher_details")
data class VoucherDetail(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id")
    val voucher: Voucher,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_concept_id")
    val paymentConcept: PaymentConcept,

    val amountPaid: BigDecimal,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()