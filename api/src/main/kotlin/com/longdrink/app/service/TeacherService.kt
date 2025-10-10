package com.longdrink.app.service

import com.longdrink.app.dto.TeacherFilterDTO
import com.longdrink.app.dto.TeacherListDTO
import com.longdrink.app.model.Teacher
import com.longdrink.app.repository.TeacherRepository
import com.longdrink.app.specification.TeacherSpecifications
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class TeacherService(private val teacherRepository: TeacherRepository) {
    fun getTeachers(filter: TeacherFilterDTO): Page<TeacherListDTO> {
        val sort = Sort.by(
            if (filter.orderDir.equals("desc", ignoreCase = true))
                Sort.Direction.DESC
            else Sort.Direction.ASC,
            filter.orderBy ?: "id"
        )

        val pageable = PageRequest.of(filter.page, filter.size, sort)

        val spec = TeacherSpecifications.withFilters(
            filter.search,
            filter.citizenId,
            filter.id
        )

        return teacherRepository.findAll(spec, pageable).map { TeacherListDTO.fromEntity(it) }
    }
}