package me.vrublevsky.team.dashboard.systems.gerrit

import com.google.gerrit.extensions.api.GerritApi
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap
import java.util.stream.Collectors

@Service
class GerritService(
        val client: GerritApi,
        val dashboardConfiguration: DashboardConfiguration
) {
    val cache: MutableMap<String, List<GerritChange>> = ConcurrentHashMap()

    fun getData(team: Team): List<GerritChange> {
        return cache.getOrElse(
                team.name,
                { throw IllegalStateException("Data are not loaded yet.") }
        )
    }

    fun fetchData() {
        dashboardConfiguration.teams.forEach { team ->
            cache[team.name] = team.gerrit.repositories.stream()
                    .flatMap { repository ->
                        client.changes()
                                .query("status:open+project:${repository.name}")
                                .get()
                                .stream()
                                .map { change ->
                                    GerritChange(
                                            change.id,
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
}
