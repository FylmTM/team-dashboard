package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import me.vrublevsky.team.dashboard.configuration.Team
import net.rcarz.jiraclient.JiraClient
import net.rcarz.jiraclient.agile.AgileClient
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import java.util.stream.Collectors

@Service
class JiraService(
        val jiraAgileClient: AgileClient,
        val jiraClient: JiraClient,
        val dashboardConfiguration: DashboardConfiguration
) {

    val cache: MutableMap<String, JiraBoard> = ConcurrentHashMap()

    fun getData(team: Team): JiraBoard {
        return cache.getOrElse(
                team.name,
                { throw IllegalStateException("Data are not loaded yet.") }
        )
    }

    fun fetchData() {
        dashboardConfiguration.teams.forEach({ team ->
            val board = jiraAgileClient.getBoard(team.jira.boardId)

            board.sprints.stream()
                    .filter { sprint ->
                        sprint.state == "active"
                    }
                    .findFirst()
                    .map { sprint ->
                        val issues = sprint.issues
                                .stream()
                                .map { issue ->
                                    jiraClient.getIssue(issue.key, "", "changelog")
                                }
                                .map { issue ->
                                    JiraIssue(
                                            "${dashboardConfiguration.jira.host}/browse/${issue.key}",
                                            issue.key,
                                            issue.summary,
                                            Optional.ofNullable(issue.assignee)
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

                        cache[team.name] = JiraBoard(
                                JiraSprint(
                                        sprint.name
                                ),
                                issues
                        )
                    }
                    .orElseGet {
                        cache[team.name] = JiraBoard(
                                JiraSprint(
                                        "No Active Sprint"
                                ),
                                ArrayList()
                        )
                    }


        })
    }
}

