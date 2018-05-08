package me.vrublevsky.team.dashboard.controller

import me.vrublevsky.team.dashboard.data.ErrorResponse
import me.vrublevsky.team.dashboard.logger
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@ControllerAdvice
@RestController
class DefaultExceptionHandler {

    companion object {
        val LOGGER = logger()
    }

    @ExceptionHandler(value = [Exception::class])
    fun defaultErrorHandler(request: HttpServletRequest, exception: Exception): ErrorResponse<DashboardError> {
        LOGGER.error("Exception happened", exception)
        return ErrorResponse(DashboardError(
                exception.message.orEmpty(),
                exception.javaClass.simpleName
        ))
    }
}

data class DashboardError(val className: String, val message: String)
