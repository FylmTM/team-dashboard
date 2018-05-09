package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.Team
import org.springframework.stereotype.Service

@Service
class JenkinsService(
        val client: JenkinsServer
) {

    fun getData(teamConfiguration: Team): JenkinsResponse {
        val job = client.getJob("job-1")
        val lastBuild = job.lastBuild;
        lastBuild.details().duration
        lastBuild.details().isBuilding
        return JenkinsResponse("jenkins")
    }
}
