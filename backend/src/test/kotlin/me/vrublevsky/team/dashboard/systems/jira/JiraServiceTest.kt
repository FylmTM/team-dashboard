package me.vrublevsky.team.dashboard.systems.jira

import me.vrublevsky.team.dashboard.UnitTest
import org.junit.Test
import org.springframework.beans.factory.annotation.Autowired

class JiraServiceTest : UnitTest() {

    @Autowired
    lateinit var jiraService: JiraService

    @Test
    fun testClientWorks() {
        jiraService.getData(team)
    }
}