package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.model.Build
import com.offbytwo.jenkins.model.BuildResult
import com.offbytwo.jenkins.model.JobWithDetails
import java.util.*

data class JenkinsJob(
        val name: String,
        val lastBuild: JenkinsJobBuild
) {
    companion object {
        fun map(job: JobWithDetails?): JenkinsJob {
            if (job == null) {
                throw IllegalStateException("Job is not found")
            }

            return JenkinsJob(
                    job.name,
                    JenkinsJobBuild.map(job.lastBuild)
            )
        }
    }
}

data class JenkinsJobBuild(
        val number: Int,
        val duration: Long,
        val estimatedDuration: Long,
        val status: String,
        val isRunning: Boolean
) {
    companion object {
        fun map(build: Build): JenkinsJobBuild {
            return JenkinsJobBuild(
                    build.number,
                    build.details().duration,
                    build.details().estimatedDuration,
                    Optional.ofNullable(build.details().result)
                            .orElse(BuildResult.UNKNOWN)
                            .toString(),
                    build.details().isBuilding
            )
        }
    }
}