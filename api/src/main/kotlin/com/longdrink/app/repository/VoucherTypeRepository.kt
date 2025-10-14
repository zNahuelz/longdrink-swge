package com.longdrink.app.repository

import com.longdrink.app.model.VoucherType
import org.springframework.data.jpa.repository.JpaRepository

interface VoucherTypeRepository : JpaRepository<VoucherType, Long> {
    fun findByName(name: String) : VoucherType?
}