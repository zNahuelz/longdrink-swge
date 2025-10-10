package com.longdrink.app.dto

data class UserProfile(
    val id: Long,
    val username: String,
    val email: String,
    val profilePicture: String?,
    val role: Map<String,Any>,
    val permissions: List<Triple<Long, String, String>>,
    val personalInfo: Map<String, Any?>?
)
