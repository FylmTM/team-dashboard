package me.vrublevsky.team.dashboard.systems.gerrit

import com.google.gerrit.extensions.api.GerritApi
import com.urswolfer.gerrit.client.rest.GerritAuthData
import com.urswolfer.gerrit.client.rest.GerritRestApiFactory
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GerritClientConfiguration(
        val configuration: DashboardConfiguration
) {

    @Bean
    fun createGerritApi(): GerritApi {
        val gerritRestApiFactory = GerritRestApiFactory()

        return gerritRestApiFactory.create(GerritAuthData.Basic(
                configuration.gerrit.host,
                configuration.gerrit.username,
                configuration.gerrit.password
        ))
    }
}
