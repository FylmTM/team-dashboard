package me.vrublevsky.team.dashboard.systems.jenkins

import me.vrublevsky.team.dashboard.data.SuccessResponse
import me.vrublevsky.team.dashboard.service.TeamConfigurationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/team/{teamName}/jenkins")
class JenkinsController(
        val teamConfigurationService: TeamConfigurationService,
        val jenkinsService: JenkinsService
) {

    @GetMapping
    fun jenkins(@PathVariable teamName: String): SuccessResponse<List<JenkinsJob>> {
        val team = teamConfigurationService.getTeam(teamName)
        return SuccessResponse(
                jenkinsService.getData(team)
        )
    }
}
