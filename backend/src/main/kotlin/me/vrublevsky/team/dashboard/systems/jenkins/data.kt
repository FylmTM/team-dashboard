package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.model.Build
import com.offbytwo.jenkins.model.JobWithDetails

data class JenkinsJob(
        val name: String,
        val previousBuild: JenkinsJobBuild?,
        val currentBuild: JenkinsJobBuild?
) {
    companion object {
        fun map(job: JobWithDetails?): JenkinsJob {
            if (job == null) {
                throw IllegalStateException("Job is not found")
            }

            val builds = job.builds
            val currentBuild = if (builds.size >= 1) builds[0] else null
            val previousBuild = if (builds.size >= 2) builds[1] else null

            return JenkinsJob(
                    job.name,
                    JenkinsJobBuild.map(currentBuild),
                    JenkinsJobBuild.map(previousBuild)
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
        fun map(build: Build?): JenkinsJobBuild? {
            if (build == null) {
                return null
            }

            return JenkinsJobBuild(
                    build.number,
                    build.details().duration,
                    build.details().estimatedDuration,
                    build.details().result.toString(),
                    build.details().isBuilding
            )
        }
    }
}