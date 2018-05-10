package me.vrublevsky.team.dashboard.systems.jira

import net.rcarz.jiraclient.ChangeLogItem
import java.util.*

data class JiraBoard(
        val sprint: JiraSprint,
        val issues: List<JiraIssue>
)

data class JiraSprint(
        val name: String
)

data class JiraIssue(
        val key: String,
        val summary: String,
        val assigneeUsername: String,
        val type: JiraIssueType,
        val status: JiraIssueStatus,
        val priority: JiraIssuePriority,
        val transitions: List<JiraIssueTransition>
)

data class JiraIssueType(
        val name: String,
        val iconUrl: String
)

data class JiraIssueStatus(
        val name: String,
        val iconUrl: String
)

data class JiraIssuePriority(
        val name: String,
        val iconUrl: String
)

data class JiraIssueChangeLogItemWithDate(
        val created: Date,
        val item: ChangeLogItem
)

data class JiraIssueTransition(
        val created: Date,
        val from: String,
        val to: String
)
