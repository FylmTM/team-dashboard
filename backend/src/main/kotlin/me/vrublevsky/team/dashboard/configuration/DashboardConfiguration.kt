package me.vrublevsky.team.dashboard.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import javax.validation.Valid
import javax.validation.constraints.NotEmpty

@Component
@ConfigurationProperties("dashboard")
class DashboardConfiguration {

    @Valid
    var teams: List<Team> = ArrayList()
}

class Team {

    @NotEmpty
    var name: String = ""

    @NotEmpty
    var members: List<Member> = ArrayList()
}

class Member {

    @NotEmpty
    var name: String = ""

    @NotEmpty
    var login: String = ""
}
