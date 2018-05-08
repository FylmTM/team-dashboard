package me.vrublevsky.team.dashboard.data

data class SuccessResponse<T>(val data: T) {
    val success: Boolean = true
}
data class ErrorResponse<T>(val error: T) {
    val success: Boolean = false
}
