package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.UnitTest
import org.junit.Ignore
import org.junit.Test
import org.springframework.beans.factory.annotation.Autowired

class JiraServiceTest : UnitTest() {

    @Autowired
    lateinit var jiraService: JiraService

    @Test
    @Ignore
    fun testClientWorks() {
        jiraService.getData(team)
    }
}
