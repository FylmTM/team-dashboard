package me.vrublevsky.team.dashboard.systems.gerrit

import me.vrublevsky.team.dashboard.data.SuccessResponse
import me.vrublevsky.team.dashboard.service.TeamConfigurationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/team/{teamName}/gerrit")
class GerritController(
        val teamConfigurationService: TeamConfigurationService,
        val gerritService: GerritService
) {

    @GetMapping
    fun gerrit(@PathVariable teamName: String): SuccessResponse<GerritResponse> {
        val teamConfiguration = teamConfigurationService.getTeamConfiguration(teamName)
        return SuccessResponse(
                gerritService.getData(teamConfiguration)
        )
    }
}
