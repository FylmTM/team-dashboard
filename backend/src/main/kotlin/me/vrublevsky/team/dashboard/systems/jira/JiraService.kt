package me.vrublevsky.team.dashboard.systems.jira

import net.rcarz.jiraclient.JiraClient
import org.springframework.stereotype.Service

@Service
class JiraService(
        val client: JiraClient
) {

    fun getData(): JiraResponse {
        // client.getIssue("TEST-123");
        return JiraResponse("jira")
    }
}
