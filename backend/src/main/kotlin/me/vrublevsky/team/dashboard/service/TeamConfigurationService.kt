package me.vrublevsky.team.dashboard.service

import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service

@Service
class TeamConfigurationService(
        val configuration: DashboardConfiguration
) {

    fun getTeamConfiguration(teamName: String): Team {
        return configuration.teams.stream()
                .filter({ team -> team.name == teamName })
                .findFirst()
                .orElseThrow({ IllegalArgumentException("Team $teamName not found.") })
    }
}
