package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.logger
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class JiraServiceScheduler(
        val jiraService: JiraService
) {

    companion object {
        val LOGGER = logger()
    }

//    @Scheduled(fixedRateString = "\${dashboard.jira.updateRate}")
    fun updateJiraData() {
        LOGGER.info("Fetch JIRA data")
        jiraService.fetchData()
        LOGGER.info("Fetch JIRA data finished")
    }
}
