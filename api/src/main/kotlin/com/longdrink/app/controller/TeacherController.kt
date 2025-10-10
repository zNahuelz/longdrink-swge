package com.longdrink.app.controller

import com.longdrink.app.dto.TeacherFilterDTO
import com.longdrink.app.dto.TeacherListDTO
import com.longdrink.app.service.TeacherService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/teacher")
class TeacherController(private val teacherService: TeacherService) {
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROOT', 'TEACHER_INDEX')")
    fun index(
        @RequestParam(required = false) search: String?,
        @RequestParam(required = false) citizenId: String?,
        @RequestParam(required = false) id: Long?,
        @RequestParam(defaultValue = "id") orderBy: String,
        @RequestParam(defaultValue = "asc") orderDir: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Page<TeacherListDTO>> {
        val filter = TeacherFilterDTO(search, citizenId, id, orderBy, orderDir, page, size)
        val result = teacherService.getTeachers(filter)
        return ResponseEntity.ok(result)
    }
}