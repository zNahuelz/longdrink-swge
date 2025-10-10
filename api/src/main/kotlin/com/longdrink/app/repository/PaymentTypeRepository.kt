package com.longdrink.app.repository

import com.longdrink.app.model.PaymentType
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentTypeRepository : JpaRepository<PaymentType, Long> {
    fun findByName(name: String): PaymentType?
}