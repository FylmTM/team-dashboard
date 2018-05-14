package me.vrublevsky.team.dashboard.systems.jenkins

import me.vrublevsky.team.dashboard.logger
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class JenkinsServiceScheduler(
        val jenkinsService: JenkinsService
) {

    companion object {
        val LOGGER = logger()
    }

    @Scheduled(fixedRateString = "\${dashboard.jenkins.updateRate}")
    fun updateJenkinsData() {
        LOGGER.info("Fetch Jenkins data")
        jenkinsService.fetchData()
        LOGGER.info("Fetch Jenkins data finished")
    }
}
