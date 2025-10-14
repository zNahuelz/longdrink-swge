package com.longdrink.app.model

import com.longdrink.app.common.Auditable
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "vouchers")
data class Voucher(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val subtotal: BigDecimal,

    @Column(name = "tax_value")
    val taxValue: BigDecimal,

    @Column(name = "tax_percentage")
    val taxPercentage: BigDecimal,

    val total: BigDecimal,

    val change: BigDecimal,

    val set: String = "",

    val correlative: String = "",

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    val student: Student,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_type_id", nullable = false)
    val voucherType: VoucherType,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_series_id", nullable = false)
    val voucherSeries: VoucherSeries,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_type_id", nullable = false)
    val paymentType: PaymentType,

    @OneToMany(mappedBy = "voucher", cascade = [CascadeType.ALL], orphanRemoval = true)
    val details: MutableList<VoucherDetail> = mutableListOf(),

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()