package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import net.rcarz.jiraclient.BasicCredentials
import net.rcarz.jiraclient.JiraClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class JiraClientConfiguration(
        val configuration: DashboardConfiguration
) {

    @Bean
    fun createJiraClient(): JiraClient {
        return JiraClient(
                configuration.jira.host,
                BasicCredentials(
                        configuration.jira.username,
                        configuration.jira.password
                )
        )
    }
}
