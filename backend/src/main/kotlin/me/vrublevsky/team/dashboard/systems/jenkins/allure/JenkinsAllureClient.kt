package me.vrublevsky.team.dashboard.systems.jenkins.allure

import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class JenkinsAllureClient(
        val restTemplate: RestTemplate,
        val dashboardConfiguration: DashboardConfiguration
) {

    fun getSuites(jobName: String, jobId: Int): JenkinsAllureSuites {
        val response = restTemplate.getForEntity(
                "${dashboardConfiguration.jenkins.host}/job/$jobName/$jobId/allure/data/suites.json",
                JenkinsAllureSuites::class.java
        )

        return response.body ?: throw IllegalStateException("Slack post message response body is null")
    }
}