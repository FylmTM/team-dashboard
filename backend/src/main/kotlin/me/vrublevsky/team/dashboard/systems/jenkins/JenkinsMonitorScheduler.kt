package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.logger
import me.vrublevsky.team.dashboard.slack.SlackClient
import me.vrublevsky.team.dashboard.slack.SlackMessageAttachment
import me.vrublevsky.team.dashboard.slack.SlackMessageAttachmentField
import me.vrublevsky.team.dashboard.slack.SlackMessageRequest
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class JenkinsMonitorScheduler(
        val client: JenkinsServer,
        val slackClient: SlackClient,
        val dashboardConfiguration: DashboardConfiguration
) {
    var lastBuildNumber: Int = 0

    companion object {
        val LOGGER = logger()
    }

    @Scheduled(fixedRateString = "\${dashboard.jenkins.monitorUpdateRate}")
    fun updateJenkinsData() {
        dashboardConfiguration.slack.jenkinsMonitor.forEach { jenkinsMonitor ->
            val job = client.getJob(jenkinsMonitor.job)

            val build = job.lastFailedBuild

            if (build == null) {
                LOGGER.info("No failed build: null.")
                return
            }

            if (build.number == 0) {
                LOGGER.info("No failed build: empty.")
                return
            }

            if (build.number == lastBuildNumber) {
                LOGGER.info("Already notified about ${build.number}.")
                return
            }

            lastBuildNumber = build.number

            val number = build.details().number
            val name = job.displayName
            val url = build.details().url
            val parameters = build.details().parameters
            val chartName = parameters.getOrDefault("CHART_NAME", "-")
            val chartVersion = parameters.getOrDefault("CHART_VERSION", "-")
            val timestamp = build.details().timestamp

            val attachment = SlackMessageAttachment(
                    "[Jenkins] Build $name #$number failed."
            )
            attachment.color = "#c23030"
            attachment.titleLink = "$url/console"
            attachment.ts = timestamp / 1000
            attachment.fields = listOf(
                    SlackMessageAttachmentField("Job", "<${job.url}|$name>"),
                    SlackMessageAttachmentField("Build", "<${build.url}|#$number>"),
                    SlackMessageAttachmentField("Chart name", chartName),
                    SlackMessageAttachmentField("Chart version", chartVersion)
            )
            LOGGER.info("Slack jenkins monitor sending: {}", attachment)
            slackClient.postMessage(
                    jenkinsMonitor.hookUrl,
                    SlackMessageRequest(
                            listOf(attachment)
                    )
            )
        }
    }
}