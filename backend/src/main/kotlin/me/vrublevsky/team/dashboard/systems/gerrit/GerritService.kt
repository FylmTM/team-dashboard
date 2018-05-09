package me.vrublevsky.team.dashboard.systems.gerrit

import com.google.gerrit.extensions.api.GerritApi
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service

@Service
class GerritService(
        val client: GerritApi
) {

    fun getData(team: Team): GerritResponse {
        return GerritResponse("gerrit")
    }
}
