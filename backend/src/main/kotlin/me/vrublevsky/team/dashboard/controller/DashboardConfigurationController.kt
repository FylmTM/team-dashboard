package me.vrublevsky.team.dashboard.controller

import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/configuration")
class DashboardConfigurationController(val configuration: DashboardConfiguration) {

    @GetMapping
    fun configuration(): DashboardConfiguration {
        return configuration
    }
}
