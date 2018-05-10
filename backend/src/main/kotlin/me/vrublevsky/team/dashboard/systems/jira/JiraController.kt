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
        val teamConfigurationService: TeamConfigurationService,
        val jiraService: JiraService
) {

    @GetMapping
    fun jira(@PathVariable teamName: String): SuccessResponse<JiraBoard> {
        val team = teamConfigurationService.getTeam(teamName)
        return SuccessResponse(
                jiraService.getData(team)
        )
    }
}
