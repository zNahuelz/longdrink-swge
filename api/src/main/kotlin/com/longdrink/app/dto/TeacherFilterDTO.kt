package com.longdrink.app.dto

data class TeacherFilterDTO(
    val search: String? = null,
    val citizenId: String? = null,
    val id: Long? = null,
    val orderBy: String? = "id",
    val orderDir: String? = "asc",
    val page: Int = 0,
    val size: Int = 10
)
