package me.vrublevsky.team.dashboard

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DashboardApplication

fun main(args: Array<String>) {
    runApplication<DashboardApplication>(*args)
}

inline fun <reified R : Any> R.logger(): Logger =
        LoggerFactory.getLogger(this::class.java.name.substringBefore("\$Companion"))
