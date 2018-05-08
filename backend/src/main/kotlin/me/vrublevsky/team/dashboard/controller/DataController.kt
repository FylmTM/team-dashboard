package me.vrublevsky.team.dashboard.controller

import me.vrublevsky.team.dashboard.data.Hello
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DataController {

    @GetMapping("/")
    fun hello() = Hello("Hi world")
}