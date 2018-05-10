package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class JenkinsService(
        val client: JenkinsServer
) {

    fun getData(team: Team): List<JenkinsJob> {
        return team.jenkins.jobs.stream()
                .map { job -> client.getJob(job) }
                .map { job -> JenkinsJob.map(job) }
                .collect(Collectors.toList())
    }
}
