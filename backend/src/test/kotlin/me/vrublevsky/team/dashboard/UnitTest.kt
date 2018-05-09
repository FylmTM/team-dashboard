package me.vrublevsky.team.dashboard

import me.vrublevsky.team.dashboard.configuration.Team
import me.vrublevsky.team.dashboard.service.TeamConfigurationService
import org.junit.Before
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("dev", "test")
abstract class UnitTest {

    @Autowired
    lateinit var teamConfigurationService: TeamConfigurationService

    lateinit var team: Team

    @Before
    fun before() {
        team = teamConfigurationService.getTeam("MyTeam")
    }
}
