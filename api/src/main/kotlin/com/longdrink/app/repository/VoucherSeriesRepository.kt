package com.longdrink.app.repository

import com.longdrink.app.model.VoucherSeries
import org.springframework.data.jpa.repository.JpaRepository

interface VoucherSeriesRepository : JpaRepository<VoucherSeries, Long> {
    fun findBySerie(serie: String) : VoucherSeries?
}