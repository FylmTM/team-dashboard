package me.vrublevsky.team.dashboard.controller

import me.vrublevsky.team.dashboard.response.GerritResponse
import me.vrublevsky.team.dashboard.response.JenkinsResponse
import me.vrublevsky.team.dashboard.response.JiraResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DataController {

    @GetMapping("/jenkins")
    fun jenkins(): JenkinsResponse {
        return JenkinsResponse("jenkins")
    }

    @GetMapping("/gerrit")
    fun gerrit(): GerritResponse {
        return GerritResponse("gerrit")
    }

    @GetMapping("/jira")
    fun jira(): JiraResponse {
        return JiraResponse("jira")
    }
}
