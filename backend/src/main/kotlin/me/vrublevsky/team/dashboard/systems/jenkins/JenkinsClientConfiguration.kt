package me.vrublevsky.team.dashboard.systems.jenkins

import com.offbytwo.jenkins.JenkinsServer
import me.vrublevsky.team.dashboard.configuration.DashboardConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.net.URI

@Configuration
class JenkinsClientConfiguration(
        val configuration: DashboardConfiguration
) {

    @Bean
    fun createJenkinsClient(): JenkinsServer {
        return JenkinsServer(
                URI(configuration.jenkins.host),
                configuration.jenkins.username,
                configuration.jenkins.password
        );
    }
}
