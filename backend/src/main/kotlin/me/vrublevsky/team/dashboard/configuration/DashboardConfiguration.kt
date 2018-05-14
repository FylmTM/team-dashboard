package me.vrublevsky.team.dashboard.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

@Component
@ConfigurationProperties("dashboard")
class DashboardConfiguration {

    @Valid
    var jira: JiraConfiguration = JiraConfiguration()

    @Valid
    var gerrit: GerritConfiguration = GerritConfiguration()

    @Valid
    var jenkins: JenkinsConfiguration = JenkinsConfiguration()

    @Valid
    var teams: List<Team> = ArrayList()
}

class GerritConfiguration {

    @NotEmpty
    var host: String = ""

    @NotEmpty
    var username: String = ""

    @NotEmpty
    var password: String = ""

    @NotEmpty
    var updateRate: Long = 0
}

class JiraConfiguration {

    @NotEmpty
    var host: String = ""

    @NotEmpty
    var username: String = ""

    @NotEmpty
    var password: String = ""

    @NotEmpty
    var updateRate: Long = 0
}

class JenkinsConfiguration {

    @NotEmpty
    var host: String = ""

    @NotEmpty
    var username: String = ""

    @NotEmpty
    var password: String = ""

    @NotEmpty
    var updateRate: Long = 0
}

class Team {

    @NotEmpty
    var name: String = ""

    @Valid
    var jira: TeamJiraConfiguration = TeamJiraConfiguration()

    @Valid
    var jenkins: TeamJenkinsConfiguration = TeamJenkinsConfiguration()

    @Valid
    var gerrit: TeamGerritConfiguration = TeamGerritConfiguration()

    @NotEmpty
    var members: List<Member> = ArrayList()
}

class TeamJiraConfiguration {

    @NotEmpty
    var boardId: Long = 0
}

class TeamJenkinsConfiguration {

    @NotEmpty
    var jobs: List<String> = ArrayList()
}

class TeamGerritConfiguration {

    @NotEmpty
    var repositories: List<TeamGerritRepositoryConfiguration> = ArrayList()
}

class TeamGerritRepositoryConfiguration {

    @NotEmpty
    var name: String = "";

    @NotEmpty
    var simpleName: String = "";
}

class Member {

    @NotEmpty
    var name: String = ""

    @NotEmpty
    var username: String = ""
}
