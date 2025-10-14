package com.longdrink.app.seeder

import com.longdrink.app.model.PaymentType
import com.longdrink.app.repository.PaymentTypeRepository
import jakarta.transaction.Transactional
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component

@Component
@Order(3)
class PaymentTypeSeeder(
    private val paymentTypeRepository: PaymentTypeRepository
) : Seeder {
    @Transactional
    override fun run() {

        @Suppress("UNUSED_VARIABLE")
        val cashPaymentType = paymentTypeRepository.findByName("EFECTIVO")
            ?: paymentTypeRepository.save(PaymentType(name = "EFECTIVO"))

        @Suppress("UNUSED_VARIABLE")
        val cardPaymentType = paymentTypeRepository.findByName("TARJETA BANCARIA")
            ?: paymentTypeRepository.save(PaymentType(name = "TARJETA BANCARIA"))

        @Suppress("UNUSED_VARIABLE")
        val yapePaymentType = paymentTypeRepository.findByName("YAPE")
            ?: paymentTypeRepository.save(PaymentType(name = "YAPE"))

        @Suppress("UNUSED_VARIABLE")
        val plinPaymentType = paymentTypeRepository.findByName("PLIN")
            ?: paymentTypeRepository.save(PaymentType(name = "PLIN"))
        println("[DB - SEEDER] Tipos de pago creados.")
    }
}