package me.vrublevsky.team.dashboard.systems.gerrit

import com.google.gerrit.extensions.api.GerritApi
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class GerritService(
        val client: GerritApi
) {

    fun getData(team: Team): List<GerritChange> {
        return team.gerrit.repositories.stream()
                .flatMap { repository ->
                    client.changes()
                            .query("status:open+project:${repository.name}")
                            .get()
                            .stream()
                            .map { change ->
                                GerritChange(
                                        repository.simpleName,
                                        change.subject,
                                        change.created,
                                        change.updated,
                                        change.insertions,
                                        change.deletions
                                )
                            }
                }
                .collect(Collectors.toList())
    }
}
