package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap
import java.util.stream.Collectors

@Service
class JenkinsService(
        val client: JenkinsServer,
        val dashboardConfiguration: DashboardConfiguration
) {

    val cache: MutableMap<String, List<JenkinsJob>> = ConcurrentHashMap()

    fun getData(team: Team): List<JenkinsJob> {
        return cache.getOrElse(
                team.name,
                { throw IllegalStateException("Data are not loaded yet.") }
        )
    }

    fun fetchData() {
        dashboardConfiguration.teams.forEach { team ->
            cache[team.name] = team.jenkins.jobs.stream()
                    .map { job -> client.getJob(job) }
                    .map { job -> JenkinsJob.map(job) }
                    .collect(Collectors.toList())
        }
    }
}
