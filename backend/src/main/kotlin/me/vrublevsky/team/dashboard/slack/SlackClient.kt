package me.vrublevsky.team.dashboard.slack

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class SlackClient(
        val restTemplate: RestTemplate
) {

    fun postMessage(url: String, message: SlackMessageRequest): String {
        val response: ResponseEntity<String> = restTemplate.postForEntity(
                url,
                message,
                String::class.java
        )

        return response.body ?: throw IllegalStateException("Slack post message response body is null")
    }
}