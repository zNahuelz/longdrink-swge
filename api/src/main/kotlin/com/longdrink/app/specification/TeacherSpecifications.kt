package com.longdrink.app.specification

import com.longdrink.app.model.Teacher
import jakarta.persistence.criteria.Predicate
import org.springframework.data.jpa.domain.Specification

object TeacherSpecifications {
    fun withFilters(
        search: String?,
        citizenId: String?,
        id: Long?
    ): Specification<Teacher> {
        return Specification { root, _, cb ->
            val predicates = mutableListOf<Predicate>()

            if (!search.isNullOrBlank()) {
                val likePattern = "%${search.uppercase()}%"
                predicates.add(
                    cb.or(
                        cb.like(cb.upper(root.get("names")), likePattern),
                        cb.like(cb.upper(root.get("paternalSurname")), likePattern),
                        cb.like(cb.upper(root.get("maternalSurname")), likePattern)
                    )
                )
            }
            if (!citizenId.isNullOrBlank()) {
                predicates.add(
                    cb.equal(cb.upper(root.get<String>("citizenId")), citizenId.uppercase())
                )
            }
            if (id != null) {
                predicates.add(cb.equal(root.get<Long>("id"), id))
            }

            cb.and(*predicates.toTypedArray())
        }
    }
}