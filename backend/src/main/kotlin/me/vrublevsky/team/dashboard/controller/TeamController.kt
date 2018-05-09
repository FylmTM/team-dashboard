package me.vrublevsky.team.dashboard.controller

import me.vrublevsky.team.dashboard.configuration.Team
import me.vrublevsky.team.dashboard.service.TeamConfigurationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TeamController(val teamConfigurationService: TeamConfigurationService) {

    @GetMapping("/team/{teamName}")
    fun configuration(@PathVariable teamName: String): Team {
        return teamConfigurationService.getTeam(teamName)
    }
}
