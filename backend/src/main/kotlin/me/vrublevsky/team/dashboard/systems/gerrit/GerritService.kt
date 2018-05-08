package me.vrublevsky.team.dashboard.systems.gerrit

import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service

@Service
class GerritService {

    fun getData(teamConfiguration: Team): GerritResponse {
        // List<ChangeInfo> changes = gerritApi.changes().query("status:merged").withLimit(10).get();
        return GerritResponse("gerrit")
    }
}
