package com.longdrink.app.seeder

import com.longdrink.app.model.VoucherSeries
import com.longdrink.app.repository.VoucherSeriesRepository
import com.longdrink.app.repository.VoucherTypeRepository
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component

@Component
@Order(5)
class VoucherSeriesSeeder(
    private val voucherSeriesRepository: VoucherSeriesRepository,
    private val voucherTypeRepository: VoucherTypeRepository
) : Seeder {

    override fun run() {
        val boletaType = voucherTypeRepository.findByName("BOLETA")
        val facturaType = voucherTypeRepository.findByName("FACTURA")

        if (boletaType == null || facturaType == null) {
            println("[DB - SEEDER] Los tipos de comprobantes deben crearse antes de las series.")
            return
        }

        if (voucherSeriesRepository.findBySerie("B001") == null) {
            voucherSeriesRepository.save(
                VoucherSeries(
                    voucherType = boletaType,
                    serie = "B001",
                    nextCorrelative = 1,
                    isActive = true
                )
            )
        }

        if (voucherSeriesRepository.findBySerie("F001") == null) {
            voucherSeriesRepository.save(
                VoucherSeries(
                    voucherType = facturaType,
                    serie = "F001",
                    nextCorrelative = 1,
                    isActive = true
                )
            )
        }
        println("[DB - SEEDER] Series de comprobantes creadas correctamente.")
    }
}