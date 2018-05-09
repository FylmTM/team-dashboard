package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.configuration.Team
import net.rcarz.jiraclient.JiraClient
import net.rcarz.jiraclient.agile.AgileClient
import org.springframework.stereotype.Service
import java.util.*
import java.util.stream.Collectors

@Service
class JiraService(
        val jiraAgileClient: AgileClient,
        val jiraClient: JiraClient
) {

    fun getData(team: Team): JiraResponse {
        val board = jiraAgileClient.getBoard(team.jira.boardId)

        val sprint = board.sprints.stream()
                .filter { sprint -> sprint.state == "active" }
                .findFirst()
                .orElseThrow { IllegalStateException("No active sprint found") }


        val issues = sprint.issues
                .stream()
                .map { issue ->
                    jiraClient.getIssue(issue.key, "", "changelog")
                }
                .map { issue ->
                    JiraIssue(
                            issue.key,
                            issue.summary,
                            Optional.of(issue.assignee)
                                    .map { user -> user.name }
                                    .orElse("none"),
                            JiraIssueType(
                                    issue.issueType.name,
                                    issue.issueType.iconUrl
                            ),
                            JiraIssueStatus(
                                    issue.status.name,
                                    issue.status.iconUrl
                            ),
                            JiraIssuePriority(
                                    issue.priority.name,
                                    issue.priority.iconUrl
                            ),
                            issue.changeLog.entries.stream()
                                    .flatMap { entry ->
                                        entry.items.stream().map { item ->
                                            JiraIssueChangeLogItemWithDate(entry.created, item)
                                        }
                                    }
                                    .filter { itemWithDate -> itemWithDate.item.field == "status" }
                                    .map { itemWithDate ->
                                        JiraIssueTransition(
                                                itemWithDate.created,
                                                itemWithDate.item.fromString,
                                                itemWithDate.item.toString
                                        )
                                    }
                                    .collect(Collectors.toList())
                    )
                }
                .collect(Collectors.toList())

        return JiraResponse(
                JiraSprint(
                        sprint.name
                ),
                issues
        )
    }
}

