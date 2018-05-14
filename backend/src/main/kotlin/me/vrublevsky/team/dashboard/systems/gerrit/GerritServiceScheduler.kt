package me.vrublevsky.team.dashboard.systems.gerrit

import me.vrublevsky.team.dashboard.logger
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class GerritServiceScheduler(
        val gerritService: GerritService
) {

    companion object {
        val LOGGER = logger()
    }

    @Scheduled(fixedRate = 2 * 60 * 1000)
    fun updateGerritData() {
        LOGGER.info("Fetch Gerrit data")
        gerritService.fetchData()
        LOGGER.info("Fetch Gerrit data finished")
    }
}