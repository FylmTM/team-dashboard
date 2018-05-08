package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.data.SuccessResponse
import me.vrublevsky.team.dashboard.service.TeamConfigurationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/team/{teamName}/jira")
class JiraController(
        val teamConfigurationService: TeamConfigurationService
) {

    @GetMapping
    fun jira(@PathVariable teamName: String): SuccessResponse<JiraResponse> {
        val teamConfiguration = teamConfigurationService.getTeamConfiguration(teamName)
        return SuccessResponse(JiraResponse("jira"))
    }
}