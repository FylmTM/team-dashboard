package me.vrublevsky.team.dashboard.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class HttpClientConfig {

    @Bean
    fun createHttpClient(): RestTemplate {
        return RestTemplate()
    }
}