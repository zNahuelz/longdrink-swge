package com.longdrink.app.dto

import com.longdrink.app.model.Teacher
import java.time.LocalDate

data class TeacherListDTO(
    val id: Long,
    val fullName: String,
    val citizenId: String,
    val citizenIdType: String,
    val phone: String,
    val address: String,
    val birthDate: LocalDate,
    val hiringDate: LocalDate,
    val dismissalDate: LocalDate?
) {
    companion object{
        fun fromEntity(entity: Teacher) = TeacherListDTO(
            id = entity.id,
            fullName = "${entity.names.uppercase()} ${entity.paternalSurname.uppercase()} ${entity.maternalSurname.uppercase()}",
            citizenId = entity.citizenId,
            citizenIdType = entity.citizenIdType,
            phone = entity.phone,
            address = entity.address,
            birthDate = entity.birthDate,
            hiringDate = entity.hiringDate,
            dismissalDate = entity.dismissalDate
        )
    }
}
