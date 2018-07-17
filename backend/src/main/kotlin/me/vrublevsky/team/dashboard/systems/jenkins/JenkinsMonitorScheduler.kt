package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.logger
import me.vrublevsky.team.dashboard.slack.SlackClient
import me.vrublevsky.team.dashboard.slack.SlackMessageAttachment
import me.vrublevsky.team.dashboard.slack.SlackMessageAttachmentField
import me.vrublevsky.team.dashboard.slack.SlackMessageRequest
import me.vrublevsky.team.dashboard.systems.jenkins.allure.JenkinsAllureClient
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap
import java.util.stream.Collectors

@Component
class JenkinsMonitorScheduler(
        val client: JenkinsServer,
        val slackClient: SlackClient,
        val jenkinsAllureClient: JenkinsAllureClient,
        val dashboardConfiguration: DashboardConfiguration
) {
    var lastBuildNumbers: MutableMap<String, Int> = ConcurrentHashMap()

    companion object {
        val LOGGER = logger()
    }

    @Scheduled(fixedRateString = "\${dashboard.jenkins.monitorUpdateRate}")
    fun updateJenkinsData() {
        dashboardConfiguration.slack.jenkinsMonitor.forEach { jenkinsMonitor ->
            val job = client.getJob(jenkinsMonitor.job)
            val build = job.lastFailedBuild
            val lastBuildNumber = lastBuildNumbers.getOrDefault(jenkinsMonitor.job, 0)

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

            lastBuildNumbers[jenkinsMonitor.job] = build.number

            val buildWithDetails = build.details()
            val number = buildWithDetails.number
            val name = job.displayName
            val url = buildWithDetails.url
            val parameters = buildWithDetails.parameters
            val chartName = parameters.getOrDefault("CHART_NAME", "-")
            val chartVersion = parameters.getOrDefault("CHART_VERSION", "-")
            val timestamp = buildWithDetails.timestamp

            // Allure report details
            val hasAllureReport = buildWithDetails.artifacts.stream()
                    .anyMatch { artifact -> artifact.displayPath == "allure-report.zip" }

            val attachments: MutableList<SlackMessageAttachment> = ArrayList()


            // Main info
            val mainInfoAttachment = SlackMessageAttachment(
                    "[Jenkins] Build $name #$number failed."
            )
            mainInfoAttachment.color = "#c23030"
            mainInfoAttachment.titleLink = "$url/console"
            mainInfoAttachment.ts = timestamp / 1000
            mainInfoAttachment.fields = listOf(
                    SlackMessageAttachmentField("Job", "<${job.url}|$name>"),
                    SlackMessageAttachmentField("Build", "<${build.url}|#$number>"),
                    SlackMessageAttachmentField("Chart name", chartName),
                    SlackMessageAttachmentField("Chart version", chartVersion)
            )
            attachments.add(mainInfoAttachment)

            // Allure info

            if (hasAllureReport) {
                val suites = jenkinsAllureClient.getSuites(name, number)

                val allureReportAttachment = SlackMessageAttachment(
                        "Allure Report"
                )
                allureReportAttachment.color = "#c23030"
                allureReportAttachment.titleLink = "$url/allure"
                allureReportAttachment.ts = timestamp / 1000
                allureReportAttachment.fields = suites.children.stream()
                        .filter { suite ->
                            suite.children.stream().anyMatch { test ->
                                test.status != "passed"
                            }
                        }
                        .map { suite ->
                            SlackMessageAttachmentField(
                                    suite.name.split(".").last(),
                                    suite.children.stream()
                                            .filter { test -> test.status != "passed" }
                                            .map { test -> "${getEmojiForTestStatus(test.status)} <$url/allure#suites/${suite.uid}/${test.uid}/|${test.name}>" }
                                            .collect(Collectors.joining("\n")),
                                    false
                            )
                        }
                        .collect(Collectors.toList())
                attachments.add(allureReportAttachment)
            }

            LOGGER.info("Slack jenkins monitor sending: {}", mainInfoAttachment)
            slackClient.postMessage(
                    jenkinsMonitor.hookUrl,
                    SlackMessageRequest(attachments)
            )
        }
    }

    private fun getEmojiForTestStatus(status: String): String {
        if (status == "passed") {
            return ":heavy_check_mark:"
        }
        if (status == "failed") {
            return ":x:"
        }
        return ":grey_question:"
    }
}