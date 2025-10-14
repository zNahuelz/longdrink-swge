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
@Table(name = "voucher_series")
data class VoucherSeries(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_type", nullable = false)
    val voucherType: VoucherType,

    @Column(length = 10, nullable = false)
    val serie: String,

    @Column(name = "next_correlative", nullable = false)
    val nextCorrelative: Int = 1,

    @Column(name = "is_active", nullable = false)
    val isActive: Boolean = true,

    @Column(name = "deleted_at")
    val deletedAt: LocalDateTime? = null,
) : Auditable()