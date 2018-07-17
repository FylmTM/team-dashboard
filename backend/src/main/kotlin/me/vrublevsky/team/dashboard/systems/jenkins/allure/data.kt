package me.vrublevsky.team.dashboard.systems.jenkins.allure

data class JenkinsAllureSuites(
        val uid: String,
        val children: List<JenkinsAllureSuite>
)

data class JenkinsAllureSuite(
       val name: String,
       val uid: String,
       val children: List<JenkinsAllureSuiteTest>

)

data class JenkinsAllureSuiteTest(
        val name: String,
        val uid: String,
        val parentUid: String,
        val status: String,
        val time: JenkinsAllureSuiteTestTime,
        val flaky: Boolean,
        val parameters: List<String>
)

data class JenkinsAllureSuiteTestTime(
        val start: Long,
        val stop: Long,
        val duration: Long
)