package com.longdrink.app.seeder

import com.longdrink.app.model.VoucherType
import com.longdrink.app.repository.VoucherTypeRepository
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component

@Component
@Order(4)
class VoucherTypeSeeder(private val voucherTypeRepository: VoucherTypeRepository) : Seeder {
    override fun run() {
        @Suppress("UNUSED_VARIABLE")
        val boletaVoucherType = voucherTypeRepository.findByName("BOLETA")
            ?: voucherTypeRepository.save(VoucherType(name = "BOLETA"))

        @Suppress("UNUSED_VARIABLE")
        val facturaVoucherType = voucherTypeRepository.findByName("FACTURA")
            ?: voucherTypeRepository.save(VoucherType(name = "FACTURA"))
        println("[DB - SEEDER] Tipos de comprobantes de venta creados.")
    }
}