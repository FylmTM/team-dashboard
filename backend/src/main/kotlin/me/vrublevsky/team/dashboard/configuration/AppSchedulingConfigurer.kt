package me.vrublevsky.team.dashboard.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.SchedulingConfigurer
import org.springframework.scheduling.config.ScheduledTaskRegistrar
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService

@Configuration
@EnableScheduling
class AppSchedulingConfigurer : SchedulingConfigurer {

    override fun configureTasks(taskRegistrar: ScheduledTaskRegistrar) {
        taskRegistrar.setScheduler(taskExecutor())
    }

    fun taskExecutor(): ScheduledExecutorService {
        return Executors.newScheduledThreadPool(5)
    }
}